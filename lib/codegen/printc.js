"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.printC = void 0;
var gen = require("io-ts-codegen");
/*
  This code lives here until it becomes available upstream
  https://github.com/gcanti/io-ts-codegen/pull/62
*/
/* eslint-disable @typescript-eslint/no-use-before-define, fp/no-let, fp/no-loops, fp/no-mutation */
function printCProperty(p, i, recursion) {
    var optional = p.isOptional ? '?' : '';
    var type = printC(p.type, i, recursion);
    var sep = ': ';
    return (printDescription(p.description, i) +
        indent(i) +
        escapePropertyKey(p.key) +
        optional +
        sep +
        type);
}
function printCLiteralCombinator(c) {
    var s = 't.LiteralC<';
    s += typeof c.value === 'string' ? escapeString(c.value) : String(c.value);
    s += '>';
    return s;
}
function printCInterfaceCombinator(c, i, recursion) {
    var s = 't.TypeC<{\n';
    s += c.properties.map(function (p) { return printCProperty(p, i + 1, recursion); }).join(',\n');
    s += "\n" + indent(i) + "}>";
    return s;
}
function printCPartialCombinator(c, i, recursion) {
    var s = 't.PartialC<{\n';
    s += c.properties
        .map(function (p) { return printCProperty(__assign(__assign({}, p), { isOptional: false }), i + 1, recursion); })
        .join(',\n');
    s += "\n" + indent(i) + "}>";
    return s;
}
function printCTypesCombinator(types, i, recursion) {
    var indentation = indent(i + 1);
    return types.map(function (t) { return "" + indentation + printC(t, i, recursion); }).join(",\n");
}
function printCUnionCombinator(c, i, recursion) {
    return 't.UnionC<[\n' + printCTypesCombinator(c.types, i, recursion) + '\n]>';
}
function printCTaggedUnionCombinator(c, i, recursion) {
    return 't.UnionC<[\n' + printCTypesCombinator(c.types, i, recursion) + '\n]>';
}
function printCIntersectionCombinator(c, i, recursion) {
    return 't.IntersectionC<[\n' + printCTypesCombinator(c.types, i, recursion) + '\n]>';
}
function printCKeyofCombinator(c, i) {
    return printC(gen.unionCombinator(c.values.map(function (value) { return gen.literalCombinator(value); })), i);
}
function printCArrayCombinator(c, i, recursion) {
    return "t.ArrayC<" + printC(c.type, i, recursion) + ">";
}
function printCExactCombinator(c, i, recursion) {
    return printC(c.type, i, recursion);
}
function printCStrictCombinator(c, i, recursion) {
    var s = 't.TypeC<{\n';
    s += c.properties.map(function (p) { return printCProperty(p, i + 1, recursion); }).join(',\n');
    s += "\n" + indent(i) + "}>";
    return s;
}
function printCReadonlyCombinator(c, i, recursion) {
    return "t.ReadonlyC<" + printC(c.type, i, recursion) + ">";
}
function printCBrandCombinator(bc, i, recursion) {
    return "t.BrandC<" + printC(bc.type, i, recursion) + ", " + bc.name + "Brand>";
}
function printCReadonlyArrayCombinator(c, i, recursion) {
    return "t.ReadonlyArrayC<" + printC(c.type, i, recursion) + ">";
}
function printCDictionaryCombinator(c, i, recursion) {
    return "t.RecordC<" + printC(c.domain, i) + ", " + printC(c.codomain, i, recursion) + ">";
}
function printCTupleCombinator(c, i, recursion) {
    var indentation = indent(i + 1);
    var s = 't.TupleC<[\n';
    s += c.types.map(function (t) { return "" + indentation + printC(t, i, recursion); }).join(',\n');
    s += "\n" + indent(i) + "]>";
    return s;
}
function printCCustomTypeDeclarationType(name) {
    return "// exists type " + name + "C extends t.AnyC";
}
function printCTypeDeclarationType(type, name, isReadonly, isExported, description, recursion) {
    if (type.kind.startsWith('Custom')) {
        return printCCustomTypeDeclarationType(name);
    }
    var s = printC(type, 0, recursion);
    if (isReadonly) {
        s = "t.ReadonlyC<" + s + ">";
    }
    s = "type " + name + "C = " + s;
    if (isExported) {
        s = "export " + s;
    }
    return printDescription(description, 0) + s;
}
function printCTypeDeclaration(declaration) {
    return printCTypeDeclarationType(declaration.type, declaration.name, declaration.isReadonly, declaration.isExported, declaration.description);
}
function printCCustomTypeDeclaration(declaration) {
    return printCCustomTypeDeclarationType(declaration.name);
}
function printC(node, i, recursion) {
    if (i === void 0) { i = 0; }
    switch (node.kind) {
        case 'Identifier':
            return node.name + 'C';
        case 'StringType':
        case 'NumberType':
        case 'BooleanType':
        case 'NullType':
        case 'UndefinedType':
        case 'FunctionType':
        case 'UnknownType':
            return "t." + node.name.charAt(0).toUpperCase().concat(node.name.slice(1)) + "C";
        case 'IntType':
            return "t.BrandC<t.NumberC, t." + node.name + "Brand>";
        case 'IntegerType':
            return 't.NumberC';
        case 'AnyArrayType':
            return 't.UnknownArrayC';
        case 'AnyDictionaryType':
            return 't.UnknownRecordC';
        case 'LiteralCombinator':
            return printCLiteralCombinator(node);
        case 'InterfaceCombinator':
            return printCInterfaceCombinator(node, i, recursion);
        case 'PartialCombinator':
            return printCPartialCombinator(node, i, recursion);
        case 'UnionCombinator':
            return printCUnionCombinator(node, i, recursion);
        case 'TaggedUnionCombinator':
            return printCTaggedUnionCombinator(node, i, recursion);
        case 'IntersectionCombinator':
            return printCIntersectionCombinator(node, i, recursion);
        case 'KeyofCombinator':
            return printCKeyofCombinator(node, i);
        case 'ArrayCombinator':
            return printCArrayCombinator(node, i, recursion);
        case 'ReadonlyArrayCombinator':
            return printCReadonlyArrayCombinator(node, i, recursion);
        case 'TupleCombinator':
            return printCTupleCombinator(node, i, recursion);
        case 'RecursiveCombinator':
            return printC(node.type, i, recursion);
        case 'DictionaryCombinator':
            return printCDictionaryCombinator(node, i, recursion);
        case 'TypeDeclaration':
            return printCTypeDeclaration(node);
        case 'CustomTypeDeclaration':
            return printCCustomTypeDeclaration(node);
        case 'CustomCombinator':
            return "typeof " + node.runtime;
        case 'ExactCombinator':
            return printCExactCombinator(node, i, recursion);
        case 'StrictCombinator':
            return printCStrictCombinator(node, i, recursion);
        case 'ReadonlyCombinator':
            return printCReadonlyCombinator(node, i, recursion);
        case 'BrandCombinator':
            return printCBrandCombinator(node, i, recursion);
    }
}
exports.printC = printC;
/* The following formating rules were copied from io-ts-codegen */
function escapePropertyKey(key) {
    return isValidPropertyKey(key) ? key : escapeString(key);
}
function indent(n) {
    var s = '';
    for (var i = 0; i < n; i++) {
        s += '  ';
    }
    return s;
}
function escapeString(s) {
    return "'" + s.replace(/'/g, "\\'") + "'";
}
function isValidPropertyKey(s) {
    return !/(^\d|\W)/.test(s);
}
function printDescription(description, i) {
    if (description) {
        return indent(i) + "/** " + description + " */\n";
    }
    return '';
}
