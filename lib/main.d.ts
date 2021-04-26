#!/usr/bin/env node
/// <reference types="node" />
import * as stream from 'stream';
export declare const parser: (args: Array<string>) => {
    [x: string]: unknown;
    inputFile: string;
    outputDir: string;
    strict: boolean;
    maskNull: boolean;
    emit: boolean;
    base: string;
    import: never[];
    importHashAlgorithm: string;
    qed: string;
    importHashLength: number;
    _: string[];
    $0: string;
};
export declare const emit: (outputFile: string, lines: Generator<string, void, undefined>) => void;
declare type Streams = {
    stderr: stream.Writable;
    stdout: stream.Writable;
};
export declare const processFile: (argv: ReturnType<typeof parser>, { stderr, stdout }: Streams) => void;
declare type Process = Streams & {
    args: Array<string>;
};
export declare function main({ args, stderr, stdout }: Process): void;
export {};
