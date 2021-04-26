#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("./main");
main_1.main({
    stderr: process.stderr,
    stdout: process.stdout,
    args: process.argv.slice(2),
});
