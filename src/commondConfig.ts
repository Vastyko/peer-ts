export const config = {
  headStr: `
import { Spore } from "../http/region";
import { checki } from "../../utils/checkOperator";
type integer = number;
`,
  output: "./output/Spore.ts",
  exceptHeaders: {
    "Content-Type": "annotation" // annotation, 将这段规则注释掉
  }
};
