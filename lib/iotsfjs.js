#!/usr/bin/env node
"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.iotsfjs = void 0;
var crypto = require("crypto");
var gen = require("io-ts-codegen");
var path = require("path");
var printc_1 = require("./codegen/printc");
var hyper_1 = require("./vocab/hyper");
/* eslint-disable @typescript-eslint/no-use-before-define */
function iotsfjs(inputSchema, args, stderr) {
    function isRegexpString(regexp) {
        return typeof regexp === 'string';
    }
    function isRegexpObject(regexp) {
        return typeof regexp === 'object';
    }
    function regexpObjectFromString(regexp) {
        var pattern = regexp.split('/').slice(1, -1).join('/');
        var _a = __read(regexp.split('/').slice(-1), 1), flags = _a[0];
        return { pattern: pattern, flags: flags };
    }
    function getRegexpObject(regexp) {
        if (isRegexpString(regexp)) {
            return regexpObjectFromString(regexp);
        }
        if (isRegexpObject(regexp)) {
            return regexp;
        }
        // eslint-disable-next-line fp/no-throw
        throw new Error('unknown regexp format');
    }
    // END: Ajv Schema Helpers
    function capitalize(word) {
        var empty = '';
        var _a = __read(word.split(empty)), c = _a[0], cs = _a.slice(1);
        return __spread([c.toUpperCase()], cs).join(empty);
    }
    // ALL_UPPER-CASE => ALL_UPPERCASE
    function typenameFromAllCaps(allCaps) {
        var typename = allCaps.split('-').join('');
        return sanitizeIdentifier(typename);
    }
    // random-caseCombination => RandomCaseCombination
    function typenameFromKebab(kebab) {
        var typename = kebab.split('-').map(capitalize).join('');
        return sanitizeIdentifier(typename);
    }
    function sanitizeIdentifier(identifier) {
        return identifier.replace(/^[^a-zA-Z_$]|[^\w$]/g, '_');
    }
    function isAllCaps(randomCase) {
        return randomCase === randomCase.toUpperCase();
    }
    function typenameFromRandom(randomCase) {
        if (isAllCaps(randomCase)) {
            return typenameFromAllCaps(randomCase);
        }
        return typenameFromKebab(randomCase);
    }
    function getDefaultExport(jsonFilePath) {
        var _a = __read(jsonFilePath.split('/').slice(-1), 1), withoutPath = _a[0];
        var _b = __read(withoutPath.split('.json'), 1), withouExtension = _b[0];
        return typenameFromRandom(withouExtension);
    }
    function updateFailure(level) {
        if (returnCode === ErrorCode.ERROR) {
            return;
        }
        // eslint-disable-next-line fp/no-mutation
        returnCode = level;
    }
    function reportError(level, message) {
        var lines = [level + ": " + message, "  in " + args.inputFile];
        stderr.write(lines.join('\n').concat('\n'));
    }
    function error(message) {
        updateFailure(ErrorCode.ERROR);
        reportError('ERROR', message);
        var escalate = "throw new Error('schema conversion failed')";
        return gen.customCombinator(escalate, escalate);
    }
    function warning(message) {
        updateFailure(ErrorCode.WARNING);
        reportError('WARNING', message);
    }
    function info(message) {
        reportError('INFO', message);
    }
    function notImplemented(item, kind) {
        var isOutsideRoot = supportedAtRoot.includes(item);
        var where = isOutsideRoot ? 'outside top-level definitions' : '';
        var message = [item, kind, 'not supported', where]
            .filter(function (s) { return s.length > 0; })
            .join(' ');
        warning(message);
    }
    function parseRef(ref) {
        var parts = ref.split('#');
        if (parts.length === 1) {
            var _a = __read(parts, 1), filePath_1 = _a[0];
            return { filePath: filePath_1, variableName: getDefaultExport(filePath_1) };
        }
        if (parts.length > 2) {
            // eslint-disable-next-line fp/no-throw
            throw new Error('unknown ref format');
        }
        var _b = __read(parts, 2), filePath = _b[0], jsonPath = _b[1];
        var jsonPathParts = jsonPath.split('/');
        if (jsonPathParts.length !== 3) {
            // eslint-disable-next-line fp/no-throw
            throw new Error('unknown ref format');
        }
        var _c = __read(jsonPathParts, 3), empty = _c[0], definitions = _c[1], name = _c[2];
        if (empty !== '') {
            // eslint-disable-next-line fp/no-throw
            throw new Error('unknown ref format');
        }
        if (definitions !== 'definitions') {
            // eslint-disable-next-line fp/no-throw
            throw new Error('unknown ref format');
        }
        var variableName = typenameFromKebab(name);
        return { filePath: filePath, variableName: variableName };
    }
    function generateChecks(schema) {
        return __spread((schema.pattern ? [checkPattern(schema.pattern)] : []), (schema.regexp
            ? [checkRegexp(schema.regexp)]
            : []), (schema.format ? [checkFormat(schema.format)] : []), (schema.minLength ? [checkMinLength(schema.minLength)] : []), (schema.maxLength ? [checkMaxLength(schema.maxLength)] : []), (schema.minimum ? [checkMinimum(schema.minimum)] : []), (schema.maximum ? [checkMaximum(schema.maximum)] : []), (schema.multipleOf ? [checkMultipleOf(schema.multipleOf)] : []), (schema.type === 'integer' ? [checkInteger] : []), (schema.minItems ? [checkMinItems(schema.minItems)] : []), (schema.maxItems ? [checkMaxItems(schema.maxItems)] : []), (schema.uniqueItems === true ? [checkUniqueItems] : []));
    }
    function printChecks(checks, jx) {
        if (checks.length < 1) {
            return 'true';
        }
        return checks.map(function (check) { return check(jx); }).join(' && ');
    }
    function generateBrandTypeIfNeeded(schema, type, name) {
        var brandChecks = generateChecks(schema);
        if (brandChecks.length > 0) {
            return gen.brandCombinator(type, function (jx) { return printChecks(brandChecks, jx); }, name);
        }
        else {
            return type;
        }
    }
    function calculateImportPath(filePath) {
        var e_2, _a;
        var _b = __read(filePath.split('.json'), 1), withoutSuffix = _b[0];
        if (withoutSuffix.startsWith(args.base)) {
            var relativePath = path.relative(documentBase, withoutSuffix);
            if (relativePath.startsWith('.')) {
                return relativePath;
            }
            return './'.concat(relativePath);
        }
        try {
            // eslint-disable-next-line fp/no-loops
            for (var imports_1 = __values(imports), imports_1_1 = imports_1.next(); !imports_1_1.done; imports_1_1 = imports_1.next()) {
                var _c = __read(imports_1_1.value, 2), uri = _c[0], location_1 = _c[1];
                if (withoutSuffix.startsWith(uri)) {
                    return location_1.concat(withoutSuffix.slice(uri.length));
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (imports_1_1 && !imports_1_1.done && (_a = imports_1.return)) _a.call(imports_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return './'.concat(withoutSuffix);
    }
    function importBaseName(filePath) {
        var _a = __read(filePath.split('/').reverse(), 1), withoutPath = _a[0];
        var _b = __read(withoutPath.split('.json'), 1), basefile = _b[0];
        var typeName = typenameFromKebab(basefile);
        return typeName.concat('_');
    }
    function importHashName(refString) {
        if (args.importHashLength === 0) {
            return '';
        }
        var _a = __read(refString.split('#'), 1), withoutFragment = _a[0];
        var fullDigest = crypto
            .createHash(args.importHashAlgorithm)
            .update(withoutFragment)
            .digest('hex');
        var shortDigest = fullDigest.slice(0, args.importHashLength);
        return shortDigest.concat('_');
    }
    function calculateImportName(filePath, refString) {
        var baseName = importBaseName(filePath);
        var hashName = importHashName(refString);
        return baseName.concat(hashName);
    }
    function isRefObject(schema) {
        if (schema.hasOwnProperty('$ref') === false) {
            return false;
        }
        if (typeof schema['$ref'] === 'string') {
            return true;
        }
        // eslint-disable-next-line fp/no-throw
        throw new Error('broken input');
    }
    function fromRef(refObject) {
        var refString = refObject.$ref, _comment = refObject.$comment, extra = __rest(refObject, ["$ref", "$comment"]);
        if (Object.keys(extra).length) {
            warning("unexpected key in a $ref object");
        }
        // eslint-disable-next-line fp/no-let
        var ref;
        try {
            // eslint-disable-next-line fp/no-mutation
            ref = parseRef(refString);
        }
        catch (_a) {
            return error('Failed to parse reference');
        }
        if (ref.filePath === '') {
            return gen.customCombinator(ref.variableName, ref.variableName, [ref.variableName]);
        }
        var importName = calculateImportName(ref.filePath, refString);
        var importPath = calculateImportPath(ref.filePath);
        imps.add("import * as " + importName + " from '" + importPath + "';");
        var variableRef = importName + "." + ref.variableName;
        return gen.customCombinator(variableRef, variableRef, [importName]);
    }
    function isSupported(feature, isRoot) {
        if (supportedEverywhere.includes(feature)) {
            return true;
        }
        if (isRoot) {
            return supportedAtRoot.includes(feature);
        }
        return supportedOutsideRoot.includes(feature);
    }
    function fromType(schema) {
        if (typeof schema.type === 'undefined') {
            return [];
        }
        var types = Array.isArray(schema.type) ? schema.type : [schema.type];
        var combinators = types.flatMap(function (t) {
            switch (t) {
                case 'string':
                    return [gen.stringType];
                case 'number':
                case 'integer':
                    return [gen.numberType];
                case 'boolean':
                    return [gen.booleanType];
                case 'null':
                    if (args.maskNull) {
                        helpers.add(nullHelper);
                        return [Null];
                    }
                    return [gen.nullType];
                case 'array':
                    if (schema.hasOwnProperty('items')) {
                        return []; // trust items validator to validate array
                    }
                    return [gen.unknownArrayType];
                case 'object':
                    if (schema.hasOwnProperty('properties')) {
                        return []; // trust properties validator to validate object
                    }
                    if (schema.hasOwnProperty('patternProperties')) {
                        return []; // trust pattern properties validator to validate object
                    }
                    if (schema.hasOwnProperty('propertyNames')) {
                        return []; // trust property names validator to validate object
                    }
                    if (schema.hasOwnProperty('additionalProperties')) {
                        return []; // trust additional properties validator to validate object
                    }
                    return [gen.unknownRecordType];
                default:
                    notImplemented(JSON.stringify(schema.type), 'type');
                    return [gen.unknownType];
            }
        });
        return genUnionCombinator(combinators);
    }
    function fromProperties(schema) {
        if ('properties' in schema && typeof schema.properties !== 'undefined') {
            if (schema.type !== 'object') {
                // eslint-disable-next-line fp/no-throw
                throw new Error('properties keyword is not supported outside explicit object definitions. See https://github.com/maasglobal/io-ts-from-json-schema/issues/33');
            }
            var combinator = gen.partialCombinator(Object.entries(schema.properties).map(function (_a) {
                var _b = __read(_a, 2), key = _b[0], value = _b[1];
                return gen.property(key, fromSchema(value));
            }));
            return [combinator];
        }
        return [];
    }
    function fromPropertyNames(schema) {
        if ('propertyNames' in schema && typeof schema.propertyNames !== 'undefined') {
            if (schema.type !== 'object') {
                // eslint-disable-next-line fp/no-throw
                throw new Error('propertyNames keyword is not supported outside explicit object definitions. See https://github.com/maasglobal/io-ts-from-json-schema/issues/33');
            }
            return [gen.recordCombinator(fromSchema(schema.propertyNames), gen.unknownType)];
        }
        return [];
    }
    function fromPatternProperties(schema) {
        var _a;
        if ('patternProperties' in schema &&
            typeof schema.patternProperties !== 'undefined') {
            if (schema.type !== 'object') {
                // eslint-disable-next-line fp/no-throw
                throw new Error('patternProperties keyword is not supported outside explicit object definitions. See https://github.com/maasglobal/io-ts-from-json-schema/issues/33');
            }
            // the mapping from pattern to item is lost in the process
            // See https://github.com/microsoft/TypeScript/issues/6579
            warning('patternProperty support has limitations');
            // The Record must also support non-pattern properties
            var exactPairs = Object.entries((_a = schema.properties) !== null && _a !== void 0 ? _a : {}).map(function (_a) {
                var _b = __read(_a, 2), key = _b[0], value = _b[1];
                return ["^" + key + "$", value];
            });
            var fuzzyPairs = Object.entries(schema.patternProperties);
            var allPairs = exactPairs.concat(fuzzyPairs);
            var valueCombinators = allPairs.map(function (_a) {
                var _b = __read(_a, 2), _key = _b[0], value = _b[1];
                return fromSchema(value);
            });
            var _b = __read(genUnionCombinator(valueCombinators), 1), valueCombinator = _b[0];
            if (typeof valueCombinator !== 'undefined') {
                return [gen.recordCombinator(gen.stringType, valueCombinator)];
            }
        }
        return [];
    }
    function fromAdditionalProperties(schema) {
        if ('additionalProperties' in schema &&
            typeof schema.additionalProperties !== 'undefined') {
            if (schema.type !== 'object') {
                // eslint-disable-next-line fp/no-throw
                throw new Error('additionalProperties keyword is not supported outside explicit object definitions. See https://github.com/maasglobal/io-ts-from-json-schema/issues/33');
            }
            if (schema.additionalProperties === false) {
                // avoid problems related to Record<string, never>
                return [];
            }
            return [
                gen.recordCombinator(gen.stringType, fromSchema(schema.additionalProperties)),
            ];
        }
        return [];
    }
    function fromPropertyRules(schema) {
        return genIntersectionCombinator(__spread(fromProperties(schema), fromPropertyNames(schema), fromPatternProperties(schema), fromAdditionalProperties(schema)));
    }
    function fromRequired(schema) {
        if ('required' in schema && typeof schema.required !== 'undefined') {
            var combinator = gen.interfaceCombinator(schema.required.map(function (key) {
                helpers.add(definedHelper);
                return gen.property(key, Defined);
            }));
            return [combinator];
        }
        return [];
    }
    function fromObjectKeywords(schema) {
        return __spread(fromPropertyRules(schema), fromRequired(schema));
    }
    function fromItems(schema) {
        if ('items' in schema && typeof schema.items !== 'undefined') {
            if (schema.type !== 'array') {
                // eslint-disable-next-line fp/no-throw
                throw new Error('items keyword is not supported outside explicit array definitions. See https://github.com/maasglobal/io-ts-from-json-schema/issues/33');
            }
            if (schema.items === true) {
                // anything goes
                return [];
            }
            if (schema.items === false) {
                // no item is valid, empty tuple
                return [gen.tupleCombinator([])];
            }
            if (schema.items instanceof Array) {
                // tuple
                if ('additionalItems' in schema && schema.additionalItems === false) {
                    var combinators = schema.items.map(function (s) { return fromSchema(s); });
                    return [gen.tupleCombinator(combinators)];
                }
                // eslint-disable-next-line fp/no-throw
                throw new Error('tuples with ...rest are not supported, set additionalItems false');
            }
            // array
            return [gen.arrayCombinator(fromSchema(schema.items))];
        }
        return [];
    }
    function fromContains(schema) {
        if ('contains' in schema && typeof schema.contains !== 'undefined') {
            warning('contains field not supported');
        }
        return [];
    }
    function fromArrayKeywords(schema) {
        return __spread(fromItems(schema), fromContains(schema));
    }
    function fromEnum(schema) {
        if ('enum' in schema && typeof schema.enum !== 'undefined') {
            var combinators = schema.enum.map(function (s) {
                if (s === null) {
                    if (args.maskNull) {
                        helpers.add(nullHelper);
                        return Null;
                    }
                    return gen.nullType;
                }
                switch (typeof s) {
                    case 'string':
                    case 'boolean':
                    case 'number':
                        return gen.literalCombinator(s);
                }
                // eslint-disable-next-line fp/no-throw
                throw new Error(typeof s + "s are not supported as part of ENUM");
            });
            return genUnionCombinator(combinators);
        }
        return [];
    }
    function fromConst(schema) {
        if ('const' in schema && typeof schema.const !== 'undefined') {
            switch (typeof schema.const) {
                case 'string':
                case 'boolean':
                case 'number':
                    return [gen.literalCombinator(schema.const)];
            }
            // eslint-disable-next-line fp/no-throw
            throw new Error(typeof schema.const + "s are not supported as part of CONST");
        }
        return [];
    }
    function fromAllOf(schema) {
        if ('allOf' in schema && typeof schema.allOf !== 'undefined') {
            var combinators = schema.allOf.map(function (s) { return fromSchema(s); });
            if (combinators.length === 1) {
                var _a = __read(combinators, 1), combinator = _a[0];
                return [combinator];
            }
            return [gen.intersectionCombinator(combinators)];
        }
        return [];
    }
    function fromAnyOf(schema) {
        if ('anyOf' in schema && typeof schema.anyOf !== 'undefined') {
            var combinators = schema.anyOf.map(function (s) { return fromSchema(s); });
            return genUnionCombinator(combinators);
        }
        return [];
    }
    function fromOneOf(schema) {
        if ('oneOf' in schema && typeof schema.oneOf !== 'undefined') {
            var combinators = schema.oneOf.map(function (s) { return fromSchema(s); });
            return genUnionCombinator(combinators);
        }
        return [];
    }
    function fromSchema(schema, isRoot) {
        if (isRoot === void 0) { isRoot = false; }
        if (typeof schema === 'boolean') {
            imps.add("import * as t from 'io-ts';");
            if (schema) {
                // accept anything
                return gen.unknownType;
            }
            else {
                // accept nothing
                return genNeverType;
            }
        }
        if (isRoot === false &&
            typeof schema.type === 'string' &&
            ['string', 'number', 'integer'].includes(schema.type)) {
            info("primitive type \"" + schema.type + "\" used outside top-level definitions");
        }
        // eslint-disable-next-line fp/no-loops
        for (var key in schema) {
            if (isSupported(key, isRoot) !== true) {
                notImplemented(key, 'field');
            }
        }
        if (isRefObject(schema)) {
            return fromRef(schema);
        }
        imps.add("import * as t from 'io-ts';");
        var combinators = __spread(fromType(schema), fromObjectKeywords(schema), fromArrayKeywords(schema), fromEnum(schema), fromConst(schema), fromAllOf(schema), fromAnyOf(schema), fromOneOf(schema));
        if (combinators.length > 1) {
            return gen.intersectionCombinator(combinators);
        }
        if (combinators.length === 1) {
            var _a = __read(combinators, 1), combinator = _a[0];
            return combinator;
        }
        if (printChecks(generateChecks(schema), 'x').length > 1) {
            // skip checks
            return gen.unknownType;
        }
        // eslint-disable-next-line fp/no-throw
        throw new Error("unknown schema: " + JSON.stringify(schema));
    }
    function extractExamples(schema) {
        if (typeof schema === 'boolean') {
            // note that in this context true is any and false is never
            return [];
        }
        if ('$ref' in schema) {
            warning('skipping examples handling for $ref object');
            return [];
        }
        var examples = schema.examples;
        if (examples instanceof Array) {
            return examples;
        }
        if (typeof examples === 'undefined') {
            return [];
        }
        // eslint-disable-next-line fp/no-throw
        throw new Error('Unexpected format of examples');
    }
    function extractDefaultValue(schema) {
        if (typeof schema === 'boolean') {
            // note that in this context true is any and false is never
            return undefined;
        }
        if ('$ref' in schema) {
            warning('skipping default value handling for $ref object');
            return undefined;
        }
        return schema['default'];
    }
    function fromDefinitions(definitions2) {
        var definitions = definitions2 !== null && definitions2 !== void 0 ? definitions2 : {};
        return Object.entries(definitions).flatMap(function (_a) {
            var _b = __read(_a, 2), k = _b[0], v = _b[1];
            var scem = v;
            var name = capitalize(k);
            if (typeof scem === 'boolean') {
                return [
                    {
                        meta: {
                            title: undefined,
                            description: undefined,
                            examples: [],
                            defaultValue: undefined,
                        },
                        dec: gen.typeDeclaration(name, gen.brandCombinator(scem ? gen.unknownType : genNeverType, function (_x) { return String(scem); }, name), true),
                    },
                ];
            }
            if (isRefObject(scem)) {
                // ref's do not have meta data
                return [
                    {
                        meta: {
                            title: undefined,
                            description: undefined,
                            examples: [],
                            defaultValue: undefined,
                        },
                        dec: gen.typeDeclaration(name, fromRef(scem), true),
                    },
                ];
            }
            return [
                {
                    meta: {
                        title: scem.title,
                        description: scem.description,
                        examples: extractExamples(scem),
                        defaultValue: extractDefaultValue(scem),
                    },
                    dec: gen.typeDeclaration(name, generateBrandTypeIfNeeded(scem, fromSchema(scem, true), name), true),
                },
            ];
        });
    }
    function fromRoot(root) {
        if (root.hasOwnProperty('$schema') === false) {
            warning("missing $schema declaration");
        }
        // root schema info is printed in the beginning of the file
        var title = defaultExport;
        var description = 'The default export. More information at the top.';
        var examples = extractExamples(root);
        var defaultValue = extractDefaultValue(root);
        imps.add("import * as t from 'io-ts';");
        exps.add("export default " + defaultExport + ";");
        return [
            {
                meta: {
                    title: title,
                    description: description,
                    examples: examples,
                    defaultValue: defaultValue,
                },
                dec: gen.typeDeclaration(defaultExport, generateBrandTypeIfNeeded(root, isRefObject(root)
                    ? error('schema root can not be a $ref object')
                    : fromSchema(root, true), defaultExport), true),
            },
        ];
    }
    function fromFile(schema) {
        var namedDefs = fromDefinitions(schema.definitions);
        if (namedDefs.map(function (_a) {
            var name = _a.dec.name;
            return name;
        }).includes(defaultExport)) {
            warning('naming clash, ignoring default export');
            return namedDefs;
        }
        var rootDef = fromRoot(schema);
        var hyperDef = hyper_1.fromHyper({
            defaultExport: defaultExport,
            extractExamples: extractExamples,
            extractDefaultValue: extractDefaultValue,
            imps: imps,
            exps: exps,
            fromSchema: fromSchema,
            generateBrandTypeIfNeeded: generateBrandTypeIfNeeded,
        })(schema);
        return namedDefs.concat(rootDef).concat(hyperDef);
    }
    function constructDefs(defInputs) {
        var metas = {};
        defInputs.forEach(function (defInput) {
            // eslint-disable-next-line fp/no-mutation
            metas[defInput.dec.name] = defInput.meta;
        });
        var decs = defInputs.map(function (_a) {
            var dec = _a.dec;
            return dec;
        });
        return gen.sort(decs).map(function (dec) {
            var _a, _b;
            var typeName = dec.name;
            var meta = metas[typeName];
            var title = (_a = meta.title) !== null && _a !== void 0 ? _a : typeName;
            var description = (_b = meta.description) !== null && _b !== void 0 ? _b : 'The purpose of this remains a mystery';
            var examples = meta.examples || [];
            var defaultValue = meta.defaultValue;
            var staticType = gen.printStatic(dec);
            var runtimeType = printc_1.printC(dec)
                .concat('\n')
                .concat(gen.printRuntime(dec))
                .replace("const " + typeName + " ", "const " + typeName + ": " + typeName + "C ")
                .replace(/\ninterface /, '\nexport interface ');
            if (typeof meta.description !== 'string') {
                info('missing description');
            }
            if (examples.length > 0) {
                imps.add("import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray';");
                imps.add("import { nonEmptyArray } from 'io-ts-types/lib/nonEmptyArray';");
            }
            return {
                typeName: typeName,
                title: title,
                description: description,
                examples: examples,
                defaultValue: defaultValue,
                staticType: staticType,
                runtimeType: runtimeType,
            };
        });
    }
    var imports, genNeverType, genIntersectionCombinator, genUnionCombinator, definedHelper, Defined, nullHelper, Null, supportedEverywhere, supportedAtRoot, supportedOutsideRoot, documentBase, defaultExport, imps, helpers, exps, ErrorCode, OK, returnCode, checkFormat, checkPattern, checkRegexp, checkMinLength, checkMaxLength, checkMinimum, checkMaximum, checkMultipleOf, checkInteger, checkMinItems, checkMaxItems, checkUniqueItems, inputs, defs, defs_1, defs_1_1, def, typeName, title, description, examples, defaultValue, staticType, runtimeType, examplesName, defaultName, e_1_1;
    var e_1, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                imports = args.import.map(function (imp) { return imp.split('^'); });
                genNeverType = gen.intersectionCombinator([
                    gen.literalCombinator(true),
                    gen.literalCombinator(false),
                ]);
                genIntersectionCombinator = function (combinators) {
                    if (combinators.length === 1) {
                        var _a = __read(combinators, 1), intersection = _a[0];
                        return [intersection];
                    }
                    if (combinators.length > 1) {
                        var intersection = gen.intersectionCombinator(combinators);
                        return [intersection];
                    }
                    return [];
                };
                genUnionCombinator = function (combinators) {
                    if (combinators.length === 1) {
                        var _a = __read(combinators, 1), union = _a[0];
                        return [union];
                    }
                    if (combinators.length > 1) {
                        var union = gen.unionCombinator(combinators);
                        return [union];
                    }
                    return [];
                };
                definedHelper = "\nexport type Defined = {} | null\nexport class DefinedType extends t.Type<Defined> {\n  readonly _tag: 'DefinedType' = 'DefinedType'\n  constructor() {\n    super(\n      'defined',\n      (u): u is Defined => typeof u !== 'undefined',\n      (u, c) => (this.is(u) ? t.success(u) : t.failure(u, c)),\n      t.identity\n    )\n  }\n}\nexport interface DefinedC extends DefinedType {}\nexport const Defined: DefinedC = new DefinedType()\n";
                Defined = gen.customCombinator('Defined', 'Defined');
                nullHelper = "\nexport interface NullBrand {\n  readonly Null: unique symbol\n}\nexport type NullC = t.BrandC<t.UnknownC, NullBrand>;\nexport const Null: NullC = t.brand(\n  t.unknown,\n  (n): n is t.Branded<unknown, NullBrand> => n === null,\n  'Null'\n)\nexport type Null = t.TypeOf<typeof Null>\n";
                Null = gen.customCombinator('Null', 'Null');
                supportedEverywhere = [
                    '$id',
                    '$comment',
                    'title',
                    'description',
                    'definitions',
                    'type',
                    'properties',
                    'propertyNames',
                    'patternProperties',
                    'required',
                    'additionalProperties',
                    'allOf',
                    'anyOf',
                    'oneOf',
                    'enum',
                    'const',
                    'items',
                    'contains',
                    'additionalItems',
                ];
                supportedAtRoot = [
                    '$schema',
                    'minimum',
                    'maximum',
                    'multipleOf',
                    'minLength',
                    'maxLength',
                    'pattern',
                    'regexp',
                    'format',
                    'minItems',
                    'maxItems',
                    'uniqueItems',
                    'default',
                    'examples',
                    'links',
                ];
                supportedOutsideRoot = ['$ref'];
                documentBase = (function () {
                    var _a = __read(args.documentURI.split('/').reverse()), reversePath = _a.slice(1);
                    return reversePath.reverse().join('/');
                })();
                defaultExport = getDefaultExport(args.inputFile);
                imps = new Set();
                helpers = new Set();
                exps = new Set();
                (function (ErrorCode) {
                    ErrorCode[ErrorCode["WARNING"] = 1] = "WARNING";
                    ErrorCode[ErrorCode["ERROR"] = 2] = "ERROR";
                })(ErrorCode || (ErrorCode = {}));
                OK = 0;
                returnCode = OK;
                checkFormat = function (format) { return function (jx) {
                    if (format === 'ipv4') {
                        return "( typeof " + jx + " !== 'string' || ((octets) => octets.length === 4 && octets.map(Number).every((octet) => Number.isInteger(octet) && octet >= 0x00 && octet <= 0xff))(" + jx + ".split('.')) )";
                    }
                    notImplemented(format, 'format');
                    return String(true);
                }; };
                checkPattern = function (pattern) { return function (jx) {
                    var stringLiteral = JSON.stringify(pattern);
                    return "( typeof " + jx + " !== 'string' || " + jx + ".match(RegExp(" + stringLiteral + ")) !== null )";
                }; };
                checkRegexp = function (regexp) { return function (jx) {
                    var _a = getRegexpObject(regexp), pattern = _a.pattern, flags = _a.flags;
                    var patternLiteral = JSON.stringify(pattern);
                    var flagsLiteral = JSON.stringify(flags);
                    return "( typeof " + jx + " !== 'string' || " + jx + ".match(RegExp(" + patternLiteral + ", " + flagsLiteral + ")) !== null )";
                }; };
                checkMinLength = function (minLength) { return function (jx) {
                    return "( typeof " + jx + " !== 'string' || " + jx + ".length >= " + minLength + " )";
                }; };
                checkMaxLength = function (maxLength) { return function (jx) {
                    return "( typeof " + jx + " !== 'string' || " + jx + ".length <= " + maxLength + " )";
                }; };
                checkMinimum = function (minimum) { return function (jx) {
                    return "( typeof " + jx + " !== 'number' || " + jx + " >= " + minimum + " )";
                }; };
                checkMaximum = function (maximum) { return function (jx) {
                    return "( typeof " + jx + " !== 'number' || " + jx + " <= " + maximum + " )";
                }; };
                checkMultipleOf = function (divisor) { return function (jx) {
                    return "( typeof " + jx + " !== 'number' || " + jx + " % " + divisor + " === 0 )";
                }; };
                checkInteger = function (jx) {
                    return "( Number.isInteger(" + jx + ") )";
                };
                checkMinItems = function (minItems) { return function (jx) {
                    return "( Array.isArray(" + jx + ") === false || " + jx + ".length >= " + minItems + " )";
                }; };
                checkMaxItems = function (maxItems) { return function (jx) {
                    return "( Array.isArray(" + jx + ") === false || " + jx + ".length <= " + maxItems + " )";
                }; };
                checkUniqueItems = function (jx) {
                    return "( Array.isArray(" + jx + ") === false || " + jx + ".length === [...new Set(" + jx + ")].length )";
                };
                inputs = fromFile(inputSchema);
                defs = constructDefs(inputs);
                if (returnCode === ErrorCode.ERROR) {
                    // eslint-disable-next-line fp/no-throw
                    throw new Error('Bailing because of errors');
                }
                if (returnCode === ErrorCode.WARNING && args.strict) {
                    // eslint-disable-next-line fp/no-throw
                    throw new Error('Bailing because of warnings');
                }
                return [4 /*yield*/, '/*'];
            case 1:
                _b.sent();
                return [4 /*yield*/, ''];
            case 2:
                _b.sent();
                return [4 /*yield*/, "" + inputSchema.title];
            case 3:
                _b.sent();
                return [4 /*yield*/, "" + inputSchema.description];
            case 4:
                _b.sent();
                return [4 /*yield*/, ''];
            case 5:
                _b.sent();
                return [4 /*yield*/, '!!! AUTO GENERATED BY IOTSFJS REFRAIN FROM MANUAL EDITING !!!'];
            case 6:
                _b.sent();
                return [4 /*yield*/, 'See https://www.npmjs.com/package/io-ts-from-json-schema'];
            case 7:
                _b.sent();
                return [4 /*yield*/, ''];
            case 8:
                _b.sent();
                return [4 /*yield*/, '*/'];
            case 9:
                _b.sent();
                return [4 /*yield*/, ''];
            case 10:
                _b.sent();
                return [5 /*yield**/, __values(imps)];
            case 11:
                _b.sent();
                return [4 /*yield*/, ''];
            case 12:
                _b.sent();
                return [5 /*yield**/, __values(helpers)];
            case 13:
                _b.sent();
                return [4 /*yield*/, ''];
            case 14:
                _b.sent();
                return [4 /*yield*/, "export const schemaId = '" + inputSchema.$id + "';"];
            case 15:
                _b.sent();
                return [4 /*yield*/, ''];
            case 16:
                _b.sent();
                _b.label = 17;
            case 17:
                _b.trys.push([17, 32, 33, 34]);
                defs_1 = __values(defs), defs_1_1 = defs_1.next();
                _b.label = 18;
            case 18:
                if (!!defs_1_1.done) return [3 /*break*/, 31];
                def = defs_1_1.value;
                typeName = def.typeName, title = def.title, description = def.description, examples = def.examples, defaultValue = def.defaultValue, staticType = def.staticType, runtimeType = def.runtimeType;
                return [4 /*yield*/, "// " + title];
            case 19:
                _b.sent();
                return [4 /*yield*/, "// " + description];
            case 20:
                _b.sent();
                return [4 /*yield*/, staticType];
            case 21:
                _b.sent();
                return [4 /*yield*/, runtimeType];
            case 22:
                _b.sent();
                if (!(examples.length > 0)) return [3 /*break*/, 25];
                examplesName = 'examples'.concat(typeName);
                return [4 /*yield*/, "/** require('io-ts-validator').validator(nonEmptyArray(" + typeName + ")).decodeSync(" + examplesName + ") // => " + examplesName + " */"];
            case 23:
                _b.sent();
                return [4 /*yield*/, "export const " + examplesName + ": NonEmptyArray<" + typeName + "> = " + JSON.stringify(examples) + " as unknown as NonEmptyArray<" + typeName + ">;"];
            case 24:
                _b.sent();
                _b.label = 25;
            case 25:
                if (!(typeof defaultValue !== 'undefined')) return [3 /*break*/, 28];
                defaultName = 'default'.concat(typeName);
                return [4 /*yield*/, "/** require('io-ts-validator').validator(" + typeName + ").decodeSync(" + defaultName + ") // => " + defaultName + " */"];
            case 26:
                _b.sent();
                return [4 /*yield*/, "export const " + defaultName + ": " + typeName + " = " + JSON.stringify(defaultValue) + " as unknown as " + typeName + ";"];
            case 27:
                _b.sent();
                _b.label = 28;
            case 28: return [4 /*yield*/, ''];
            case 29:
                _b.sent();
                _b.label = 30;
            case 30:
                defs_1_1 = defs_1.next();
                return [3 /*break*/, 18];
            case 31: return [3 /*break*/, 34];
            case 32:
                e_1_1 = _b.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 34];
            case 33:
                try {
                    if (defs_1_1 && !defs_1_1.done && (_a = defs_1.return)) _a.call(defs_1);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 34: return [5 /*yield**/, __values(exps)];
            case 35:
                _b.sent();
                return [4 /*yield*/, ''];
            case 36:
                _b.sent();
                return [4 /*yield*/, '// Success'];
            case 37:
                _b.sent();
                return [2 /*return*/];
        }
    });
}
exports.iotsfjs = iotsfjs;
