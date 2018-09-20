"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    headStr: `
declare const Spore : <P, B, H, R>(apiUrl: string) => any;
type integer = number;
`,
    output: "./output/Spore.ts"
};
