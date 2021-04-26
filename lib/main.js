#!/usr/bin/env node
"use strict";
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.processFile = exports.emit = exports.parser = void 0;
var crypto = require("crypto");
var fs = require("fs");
var glob_1 = require("glob");
var path = require("path");
var yargs = require("yargs");
var iotsfjs_1 = require("./iotsfjs");
var parser = function (args) {
    var argv = yargs(args)
        .option('inputFile', { type: 'string', demandOption: true })
        .option('outputDir', { type: 'string', demandOption: true })
        .option('strict', { type: 'boolean', default: false })
        .option('maskNull', { type: 'boolean', default: false })
        .option('emit', { type: 'boolean', default: true })
        .option('base', { type: 'string', default: '' })
        .option('import', { type: 'string', array: true, default: [] })
        .option('importHashAlgorithm', {
        type: 'string',
        default: 'sha256',
        choices: crypto.getHashes(),
        hidden: true,
    })
        .option('qed', {
        type: 'string',
        default: '.',
        hidden: true,
    })
        .option('importHashLength', {
        type: 'number',
        default: 0,
    })
        .help().argv;
    return argv;
};
exports.parser = parser;
var emit = function (outputFile, lines) {
    var e_1, _a;
    function createParentDir(file) {
        var parentDir = path.dirname(file);
        if (fs.existsSync(parentDir)) {
            return;
        }
        createParentDir(parentDir);
        fs.mkdirSync(parentDir);
    }
    createParentDir(outputFile);
    var fd = fs.openSync(outputFile, 'w');
    fs.writeFileSync(fd, '');
    try {
        // eslint-disable-next-line fp/no-loops
        for (var lines_1 = __values(lines), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
            var line = lines_1_1.value;
            fs.appendFileSync(fd, line + "\n");
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) _a.call(lines_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    fs.closeSync(fd);
};
exports.emit = emit;
var processFile = function (argv, _a) {
    var _b;
    var stderr = _a.stderr, stdout = _a.stdout;
    var inputSchema = JSON.parse(fs.readFileSync(path.resolve(argv.inputFile), 'utf-8'));
    var _c = __read(((_b = inputSchema.$id) !== null && _b !== void 0 ? _b : 'file://'.concat(path.resolve(argv.inputFile))).split('#'), 1), documentURI = _c[0];
    if (documentURI.startsWith(argv.base) === false) {
        stderr.write("Document URI " + documentURI + " is outside of output base.\n");
    }
    var args = __assign(__assign({}, argv), { documentURI: documentURI });
    var relativeP = documentURI.slice(argv.base.length);
    var outputFile = path.join(argv.outputDir, relativeP.split('.json').join('.ts'));
    var outputData = iotsfjs_1.iotsfjs(inputSchema, args, stderr);
    if (argv.emit) {
        exports.emit(outputFile, outputData);
    }
    stdout.write(argv.qed);
};
exports.processFile = processFile;
function main(_a) {
    var args = _a.args, stderr = _a.stderr, stdout = _a.stdout;
    var _b = exports.parser(args), inputGlob = _b.inputFile, commonArgs = __rest(_b, ["inputFile"]);
    var schemaFiles = glob_1.glob.sync(inputGlob);
    stdout.write("Converting " + schemaFiles.length + " schema files from " + inputGlob + ".\n");
    schemaFiles.sort().forEach(function (inputFile) {
        try {
            exports.processFile(__assign(__assign({}, commonArgs), { inputFile: inputFile }), { stderr: stderr, stdout: stdout });
        }
        catch (e) {
            stderr.write("iotsfjs crash while processing " + path.resolve(inputFile) + '\n');
            // eslint-disable-next-line fp/no-throw
            throw e;
        }
    });
}
exports.main = main;
