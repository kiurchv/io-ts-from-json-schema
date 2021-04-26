"use strict";
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
exports.fromHyper = exports.fromSelfLink = exports.toTargetHints = exports.toTargetSchema = exports.toHeaderSchema = exports.toSubmissionSchema = exports.toHrefSchema = exports.toHref = void 0;
var gen = require("io-ts-codegen");
var uri_template_1 = require("uri-template");
function toHref(g) {
    return function (link) {
        uri_template_1.parse(link.href);
        var hrefTemplateExport = "_links_" + link.rel + "_Href";
        var schema = {
            type: 'string',
            const: link.href,
            default: link.href,
        };
        var title = 'Href Template';
        var description = 'Href body format as described by hyper schema href.';
        var examples = g.extractExamples(schema);
        var defaultValue = g.extractDefaultValue(schema);
        return {
            meta: {
                title: title,
                description: description,
                examples: examples,
                defaultValue: defaultValue,
            },
            dec: gen.typeDeclaration(hrefTemplateExport, g.generateBrandTypeIfNeeded(schema, g.fromSchema(schema), hrefTemplateExport), true),
        };
    };
}
exports.toHref = toHref;
function toHrefSchema(g) {
    return function (link) {
        var hrefVariablesExport = "_links_" + link.rel + "_HrefSchema";
        var schema = link.hrefSchema;
        var title = 'Href Variables';
        var description = 'Href variable format as described by hyper schema hrefSchema.';
        var examples = g.extractExamples(schema);
        var defaultValue = g.extractDefaultValue(schema);
        return {
            meta: {
                title: title,
                description: description,
                examples: examples,
                defaultValue: defaultValue,
            },
            dec: gen.typeDeclaration(hrefVariablesExport, g.generateBrandTypeIfNeeded(schema, g.fromSchema(schema), hrefVariablesExport), true),
        };
    };
}
exports.toHrefSchema = toHrefSchema;
function toSubmissionSchema(g) {
    return function (link) {
        var requestBodyExport = "_links_" + link.rel + "_SubmissionSchema";
        var schema = link.submissionSchema;
        var title = 'Request Body';
        var description = 'Request body format as described by hyper schema submissionSchema.';
        var examples = g.extractExamples(schema);
        var defaultValue = g.extractDefaultValue(schema);
        return {
            meta: {
                title: title,
                description: description,
                examples: examples,
                defaultValue: defaultValue,
            },
            dec: gen.typeDeclaration(requestBodyExport, g.generateBrandTypeIfNeeded(schema, g.fromSchema(schema), requestBodyExport), true),
        };
    };
}
exports.toSubmissionSchema = toSubmissionSchema;
function toHeaderSchema(g) {
    return function (link) {
        var requestHeadersExport = "_links_" + link.rel + "_HeaderSchema";
        var schema = {
            allOf: [
                {
                    type: 'object',
                    additionalProperties: {
                        type: 'string',
                    },
                },
                {
                    type: 'object',
                    properties: link.headerSchema,
                    required: Object.keys(link.headerSchema),
                    additionalProperties: true,
                },
            ],
        };
        var title = 'Request Headers';
        var description = 'Request headers format as described by hyper schema headerSchema.';
        var examples = g.extractExamples(schema);
        var defaultValue = g.extractDefaultValue(schema);
        return {
            meta: {
                title: title,
                description: description,
                examples: examples,
                defaultValue: defaultValue,
            },
            dec: gen.typeDeclaration(requestHeadersExport, g.generateBrandTypeIfNeeded(schema, g.fromSchema(schema), requestHeadersExport), true),
        };
    };
}
exports.toHeaderSchema = toHeaderSchema;
function toTargetSchema(g) {
    return function (link) {
        var responseBodyExport = "_links_" + link.rel + "_TargetSchema";
        var schema = link.targetSchema;
        var title = 'Response Body';
        var description = 'Response body format as described by hyper schema targetschema.';
        var examples = g.extractExamples(schema);
        var defaultValue = g.extractDefaultValue(schema);
        return {
            meta: {
                title: title,
                description: description,
                examples: examples,
                defaultValue: defaultValue,
            },
            dec: gen.typeDeclaration(responseBodyExport, g.generateBrandTypeIfNeeded(schema, g.fromSchema(schema), responseBodyExport), true),
        };
    };
}
exports.toTargetSchema = toTargetSchema;
function toTargetHints(g) {
    return function (link) {
        var headers = Object.entries(link.targetHints).map(function (_a) {
            var _b = __read(_a, 2), k = _b[0], v = _b[1];
            return [k, v.join(', ')];
        });
        var responseHeadersExport = "_links_" + link.rel + "_TargetHints";
        var schema = {
            allOf: [
                {
                    type: 'object',
                    additionalProperties: {
                        type: 'string',
                    },
                },
                {
                    type: 'object',
                    properties: Object.fromEntries(headers.map(function (_a) {
                        var _b = __read(_a, 2), k = _b[0], v = _b[1];
                        return [k, { type: 'string', const: v }];
                    })),
                    required: headers.map(function (_a) {
                        var _b = __read(_a, 2), k = _b[0], _v = _b[1];
                        return k;
                    }),
                    additionalProperties: true,
                },
            ],
            default: Object.fromEntries(headers),
        };
        var title = 'Response Headers';
        var description = 'Response headers format as described by hyper schema targetHints.';
        var examples = g.extractExamples(schema);
        var defaultValue = g.extractDefaultValue(schema);
        return {
            meta: {
                title: title,
                description: description,
                examples: examples,
                defaultValue: defaultValue,
            },
            dec: gen.typeDeclaration(responseHeadersExport, g.generateBrandTypeIfNeeded(schema, g.fromSchema(schema), responseHeadersExport), true),
        };
    };
}
exports.toTargetHints = toTargetHints;
function fromSelfLink(g) {
    g.imps.add("import * as t from 'io-ts';");
    return function (link) { return [
        toHref(g)(link),
        toHrefSchema(g)(link),
        toHeaderSchema(g)(link),
        toSubmissionSchema(g)(link),
        toTargetHints(g)(link),
        toTargetSchema(g)(link),
    ]; };
}
exports.fromSelfLink = fromSelfLink;
function fromHyper(g) {
    return function (root) {
        var _a;
        var hyper = root;
        var links = (_a = hyper.links) !== null && _a !== void 0 ? _a : [];
        var implementations = links.filter(function (_a) {
            var rel = _a.rel;
            return rel === 'implementation';
        });
        if (implementations.length > 1) {
            g.warning('found several links where rel="implementation"');
            return [];
        }
        if (implementations.length !== links.length) {
            g.warning('only hyper schema links with rel="implementation" are supported at the moment');
        }
        var _b = __read(implementations, 1), first = _b[0];
        if (typeof first === 'undefined') {
            return [];
        }
        return fromSelfLink(g)(first);
    };
}
exports.fromHyper = fromHyper;
