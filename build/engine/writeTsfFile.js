"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const moment = require("moment");
const commondConfig_1 = require("../commondConfig");
function writeFileWith(p) { }
exports.writeFileWith = writeFileWith;
function logFile(str, des) {
    if (typeof str === "object") {
        str = JSON.stringify(str);
    }
    des =
        des ||
            "file-logger, [" + moment(Date.now()).format("YYYY-MM-DD--HH:mm:ss") + "]";
    fs.writeFileSync("./output/log.md", ">" + des + "\n```json\n" + str + "\n```\n\n---\n\n", {
        flag: "a"
    });
}
exports.logFile = logFile;
exports.tsFile = {
    fileName: commondConfig_1.config.output,
    log(str, des) {
        des =
            des ||
                "file-logger, [" +
                    moment(Date.now()).format("YYYY-MM-DD--HH:mm:ss") +
                    "]";
        fs.writeFileSync(exports.tsFile.fileName, "// " + des + "\n\n" + str + "\n\n", {
            flag: "a"
        });
        return exports.tsFile;
    },
    clear() {
        fs.writeFileSync(exports.tsFile.fileName, "", { flag: "w" });
        return exports.tsFile;
    }
};
function clearLog() {
    fs.writeFileSync("./output/log.md", "", { flag: "w" });
}
exports.clearLog = clearLog;
