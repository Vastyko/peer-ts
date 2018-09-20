import * as fs from "fs";
import * as moment from "moment";
import { config } from "../commondConfig";

export function writeFileWith(p: {
  parameters: any[];
  response: any;
  name: string;
}) {}
export function logFile(str, des?) {
  if (typeof str === "object") {
    str = JSON.stringify(str);
  }
  des =
    des ||
    "file-logger, [" + moment(Date.now()).format("YYYY-MM-DD--HH:mm:ss") + "]";
  fs.writeFileSync(
    "./output/log.md",
    ">" + des + "\n```json\n" + str + "\n```\n\n---\n\n",
    {
      flag: "a"
    }
  );
}

export const tsFile = {
  fileName: config.output,
  log(str: string, des?: string) {
    des =
      des ||
      "file-logger, [" +
        moment(Date.now()).format("YYYY-MM-DD--HH:mm:ss") +
        "]";
    fs.writeFileSync(tsFile.fileName, "// " + des + "\n\n" + str + "\n\n", {
      flag: "a"
    });
    return tsFile;
  },
  clear() {
    fs.writeFileSync(tsFile.fileName, "", { flag: "w" });
    return tsFile;
  }
};

export function clearLog() {
  fs.writeFileSync("./output/log.md", "", { flag: "w" });
}
