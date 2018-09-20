import { swagger } from "../config/swaggerJSON";
import { nameConfig } from "../config/nameConfig";
import { logFile, clearLog } from "./writeTsfFile";
import { analy } from "./analy";
import { config } from "../commondConfig";
type valuetype = "string" | "number" | "boolean";

type OneParam = {
  name: string;
  in: string;
  required: boolean;
  type: valuetype;
  description: string;
  schema?: {
    $ref: string;
  };
};
type OneProp = {
  description: string;
  example: string;
  type: string;
  $ref?: string;
};
type Props = {
  [x: string]: OneProp;
};
// 用于生成一条ts属性语句
function oneParam(p: OneParam) {
  // 使用Except去除某些headers
  return `${config.exceptHeaders[p.name] === "annotation" ? "// " : ""}'${
    p.name
  }'${p.required ? "" : "?"} : ${p.type}; ${
    p.description ? "// " + p.description : ""
  }\n`;
}
// @example :  #/definitions/7.1.1创建团队Request
function getRef(path: string) {
  const index = path.split("/").pop() + "";
  return swagger.definitions[index.replace("~1", "/")];
}

function buildOneRule(p: {
  name: string;
  type: string;
  description: string;
  required?: boolean;
}) {
  // 避免意外转行
  if (p.description) {
    p.description = p.description.replace(/\n/g, " ");
  }

  return `${p.name}${p.required ? "" : "?"} : ${p.type}; ${
    p.description ? "// " + p.description : ""
  }\n`;
}
function seeObject(p) {
  let rus = "";
  if (p.type === "object") {
    if (p.properties) {
      const props = p.properties as Props;
      Object.getOwnPropertyNames(props).forEach(propName => {
        const prop = props[propName];
        rus += buildOneRule({
          name: propName,
          type: schema(prop),
          description: prop.description,
          required: true
        });
      });
    }
  }
  rus = "{\n" + rus + "}";
  return rus;
}
function seeArray(p) {
  let rus = "";
  if (p.type === "array") {
    if (p.items) {
      rus = schema(p.items);
    }
  }
  rus = rus + "[]\n";
  return rus;
}

function schema(p: { $ref?: string }) {
  let ref;
  if (p.$ref) {
    ref = getRef(p.$ref);
  }
  // 没有ref, 使用p;
  if (!ref) {
    ref = p;
  }
  if (ref.type === "object") {
    return seeObject(ref);
  } else if (ref.type === "array") {
    return seeArray(ref);
  } else {
    return ref.type;
  }
}

function parameters(arr: OneParam[]) {
  const apiOption = {} as any;
  arr.forEach(onep => {
    const inType = onep.in;
    if (onep.schema) {
      apiOption[inType] = schema(onep.schema);
    } else {
      if (apiOption[inType] === undefined) {
        apiOption[inType] = [oneParam(onep)];
      } else {
        apiOption[inType].push(oneParam(onep));
      }
    }
  });
  return apiOption;
}

function response(obj) {
  const resOption = {};
  if (!obj) {
    debugger;
  }
  Object.getOwnPropertyNames(obj).forEach(d => {
    if (obj[d].schema) resOption[d] = schema(obj[d].schema);
    else {
      resOption[d] = obj[d].description;
    }
  });
  return resOption;
}

// list the name set;
const nameArray: string[] = [];
function getName(str: string) {
  const rus = str.split(" ").pop() + "";
  nameArray.push(rus);
  return getKey(rus);
}

function getKey(d: string) {
  return nameConfig[d] ? nameConfig[d] : d;
}

function getNameConfigTs() {
  let rus = "";
  nameArray.forEach(d => {
    const key = getKey(d);
    rus += '"' + d + '":"' + key + '", \n';
  });
  return "export const nameConfig = {" + rus + "}";
}

function writeTsFile() {}
export function Peer() {
  const tsOption = {};
  const config = {
    name: ""
  };
  Object.getOwnPropertyNames(swagger.paths).forEach(api => {
    // api , url, /api/user/..
    const oneApi = swagger.paths[api];
    let methodOption = (tsOption[api] = {});
    // get, post
    Object.getOwnPropertyNames(oneApi).forEach(method => {
      methodOption[method] = {
        parameters: parameters(oneApi[method].parameters),
        responses: response(oneApi[method].responses),
        name: getName(oneApi[method].summary),
        summary: oneApi[method].summary
      };
    });
    config.name = getNameConfigTs();
  });
  clearLog();
  analy(tsOption);
  logFile(tsOption);
  logFile(config.name);
  // console.log(tsOption, swagger, nameArray, Array.from(new Set(nameArray)));
}
