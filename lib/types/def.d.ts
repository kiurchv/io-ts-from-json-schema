import * as gen from 'io-ts-codegen';
import { JSONSchema7 } from 'json-schema';
export declare type Def = {
    typeName: string;
    title: string;
    description: string;
    examples: Array<unknown>;
    defaultValue: unknown;
    staticType: string;
    runtimeType: string;
};
export declare type Examples = Array<unknown>;
export declare type DefMeta = {
    title: JSONSchema7['title'];
    description: JSONSchema7['description'];
    examples: Examples;
    defaultValue: JSONSchema7['default'];
};
export declare type DefInput = {
    meta: DefMeta;
    dec: gen.TypeDeclaration;
};
