#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const figlet_1 = __importDefault(require("figlet"));
const UploadSourcemaps_1 = require("./UploadSourcemaps");
const program = new commander_1.Command();
console.log(figlet_1.default.textSync('Instabug CLI'));
program
    .name('instaubg')
    .version('1.0.0-beta1')
    .description('A CLI for uploading source maps to Instabug dashboard.')
    .usage('[command]')
    .addCommand(UploadSourcemaps_1.uploadSourcemapsCommand);
program.parse(process.argv);
