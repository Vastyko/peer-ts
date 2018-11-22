#!/usr/bin/env node
import * as fs from "fs";
import * as path from "path";
import * as jsonfile from "jsonfile";
import { Peer } from "./engine/peer";
var apib2swagger = require("apib2swagger"), options = { preferReference: true };
function ConvertToSwagger(apiPath, func) {
    var apiStr = fs.readFileSync(apiPath).toString();
    function CheckApiStr(str) {
        var rus = "";
        var len = str.length;
        for (var i = 0; i < len; i++) {
            if (str[i] && str[i].charCodeAt(0) > 9) {
                rus += str[i];
            }
        }
        return rus;
    }
    var checkApiStr = CheckApiStr(apiStr);
    apib2swagger.convert(checkApiStr, options, function (error, result) {
        if (error) {
            console.error(error);
        }
        else {
            func(result.swagger);
        }
    });
}
function PeerBin() {
    var obj = {
        nameConfig: "./name.json",
        apibPath: "./api.md",
        headStr: 'import { Spore } from "../http/region";\nimport { checki } from "../../utils/checkOperator";\n type integer = number;',
        output: "./Spore.ts",
        outputNameConfig: "./outNameConfig.json",
        exceptHeaders: {
            "Content-Type": "annotation"
        },
        loggerDir: "./"
    };
    // 读取配置的json
    try {
        Object.assign(obj, jsonfile.readFileSync(path.resolve("peer.config.json")));
    }
    catch (err) {
        console.error(err);
    }
    // 预处理读取的数据
    var apib = path.resolve(obj.apibPath);
    var output = path.resolve(obj.output);
    var outputNameConfig = path.resolve(obj.outputNameConfig || obj.nameConfig);
    var nameConfig = jsonfile.readFileSync(obj.nameConfig);
    var peerCompile = {
        headStr: obj.headStr,
        exceptHeaders: obj.exceptHeaders
    };
    if (obj) {
        ConvertToSwagger(apib, function (swagger) {
            var peerObj = Peer(swagger, nameConfig, peerCompile);
            // 输出nameConfig
            fs.writeFileSync(outputNameConfig, peerObj.nameConfig, { flag: "w" });
            // 输出TypesccriptSpore;
            fs.writeFileSync(output, peerObj.tsSporeStr, { flag: "w" });
            if (obj.loggerDir) {
                fs.writeFileSync(path.resolve(obj.loggerDir, "tsLog.json"), JSON.stringify(peerObj.tsOption, null, 2), { flag: "w" });
                fs.writeFileSync(path.resolve(obj.loggerDir, "swaggerLog.json"), JSON.stringify(swagger, null, 2), { flag: "w" });
            }
        });
    }
}
// 开始运行Peer;
PeerBin();
//# sourceMappingURL=index.js.map