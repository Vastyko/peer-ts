"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const headStr = `
import { Spore } from "../http/region";
import { checki } from "../../utils/checkOperator";
type integer = number;
`;

exports.config = {
  headStr,
  output: "./output/Spore.ts",
  exceptHeaders: {
    "Content-Type": "annotation" // annotation, 将这段规则注释掉
  }
};
