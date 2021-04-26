#!/usr/bin/env node
/// <reference types="node" />
import { JSONSchema7 } from 'json-schema';
import * as stream from 'stream';
export declare type Args = {
    import: Array<string>;
    documentURI: string;
    inputFile: string;
    base: string;
    importHashLength: number;
    importHashAlgorithm: string;
    strict: boolean;
    maskNull: boolean;
};
export declare function iotsfjs(inputSchema: JSONSchema7, args: Args, stderr: stream.Writable): Generator<string, void, undefined>;
