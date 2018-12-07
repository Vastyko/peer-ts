#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import * as jsonfile from "jsonfile";
import { Peer } from "./engine/peer";

var apib2swagger = require("apib2swagger"),
  options = { preferReference: true };

function ConvertToSwagger(apiPath: any, func: (swagger: any) => void) {
  const apiStr = fs.readFileSync(apiPath).toString();

  // 去掉特殊的字符 保证windows上的运行;
  apiStr.replace(/\r\n/g, "\n");
  function CheckApiStr(str: string) {
    let rus = "";
    let len = str.length;
    for (let i = 0; i < len; i++) {
      if (str[i] && str[i].charCodeAt(0) > 9) {
        rus += str[i];
      }
    }
    return rus;
  }

  let checkApiStr = CheckApiStr(apiStr);

  apib2swagger.convert(checkApiStr, options, function(error, result) {
    if (error) {
      console.error(error);
    } else {
      func(result.swagger);
    }
  });
}

function PeerBin() {
  const obj = {
    nameConfig: "./name.json",
    apibPath: "./api.md",
    headStr:
      'import { Spore } from "../http/region";\nimport { checki } from "../../utils/checkOperator";\n type integer = number;',
    output: "./Spore.ts",
    outputNameConfig: "./outNameConfig.json",
    exceptHeaders: {
      "Content-Type": "annotation" as "annotation"
    },
    loggerDir: "./"
  };
  // 读取配置的json
  try {
    Object.assign(obj, jsonfile.readFileSync(path.resolve("peer.config.json")));
  } catch (err) {
    console.error(err);
  }

  // 预处理读取的数据
  const apib = path.resolve(obj.apibPath);
  const output = path.resolve(obj.output);
  const outputNameConfig = path.resolve(obj.outputNameConfig || obj.nameConfig);
  const nameConfig = jsonfile.readFileSync(obj.nameConfig);
  const peerCompile = {
    headStr: obj.headStr,
    exceptHeaders: obj.exceptHeaders
  };

  if (obj) {
    ConvertToSwagger(apib, swagger => {
      const peerObj = Peer(swagger, nameConfig, peerCompile);
      // 输出nameConfig
      fs.writeFileSync(outputNameConfig, peerObj.nameConfig, { flag: "w" });
      // 输出TypesccriptSpore;
      fs.writeFileSync(output, peerObj.tsSporeStr, { flag: "w" });

      if (obj.loggerDir) {
        fs.writeFileSync(
          path.resolve(obj.loggerDir, "tsLog.json"),
          JSON.stringify(peerObj.tsOption, null, 2),
          { flag: "w" }
        );
        fs.writeFileSync(
          path.resolve(obj.loggerDir, "swaggerLog.json"),
          JSON.stringify(swagger, null, 2),
          { flag: "w" }
        );
      }
    });
  }
}

// 开始运行Peer;
PeerBin();
