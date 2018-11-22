"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analy_1 = require("./analy");
function Peer(swagger, nameConfig, peerConfig) {
    // 记录Peer 生成的中间json; 最后解析tsOption生成的TypescriptSpore;
    var tsOption = {};
    // 记录peer运行生成的推荐配置文件
    var config = {
        name: ""
    };
    // 用于生成一条ts属性语句
    function oneParam(p) {
        // 使用Except去除某些headers
        return (peerConfig.exceptHeaders[p.name] === "annotation" ? "// " : "") + "'" + p.name + "'" + (p.required ? "" : "?") + " : " + p.type + "; " + (p.description ? "// " + p.description : "") + "\n";
    }
    // @example :  #/definitions/7.1.1创建团队Request
    function getRef(path) {
        var index = path.split("/").pop() + "";
        return swagger.definitions[index.replace("~1", "/")];
    }
    function buildOneRule(p) {
        // 避免意外转行
        if (p.description) {
            p.description = p.description.replace(/\n/g, " ");
        }
        return "" + p.name + (p.required ? "" : "?") + " : " + p.type + "; " + (p.description ? "// " + p.description : "") + "\n";
    }
    function seeObject(p) {
        var rus = "";
        if (p.type === "object") {
            if (p.properties) {
                var props_1 = p.properties;
                Object.getOwnPropertyNames(props_1).forEach(function (propName) {
                    var prop = props_1[propName];
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
        var rus = "";
        if (p.type === "array") {
            if (p.items) {
                rus = schema(p.items);
            }
        }
        rus = rus + "[]\n";
        return rus;
    }
    function schema(p) {
        var ref;
        if (p.$ref) {
            ref = getRef(p.$ref);
        }
        // 没有ref, 使用p;
        if (!ref) {
            ref = p;
        }
        if (ref.type === "object") {
            return seeObject(ref);
        }
        else if (ref.type === "array") {
            return seeArray(ref);
        }
        else {
            return ref.type;
        }
    }
    function parameters(arr) {
        var apiOption = {};
        arr.forEach(function (onep) {
            var inType = onep.in;
            if (onep.schema) {
                apiOption[inType] = schema(onep.schema);
            }
            else {
                if (apiOption[inType] === undefined) {
                    apiOption[inType] = [oneParam(onep)];
                }
                else {
                    apiOption[inType].push(oneParam(onep));
                }
            }
        });
        return apiOption;
    }
    function response(obj) {
        var resOption = {};
        if (!obj) {
            debugger;
        }
        Object.getOwnPropertyNames(obj).forEach(function (d) {
            if (obj[d].schema)
                resOption[d] = schema(obj[d].schema);
            else {
                resOption[d] = obj[d].description;
            }
        });
        return resOption;
    }
    // list the name set;
    var nameArray = [];
    function getName(str) {
        var rus = str.split(" ").pop() + "";
        nameArray.push(rus);
        return getKey(rus);
    }
    function getKey(d) {
        return nameConfig[d] ? nameConfig[d] : d;
    }
    function getNameConfigTs() {
        var rus = nameArray
            .map(function (d) {
            var key = getKey(d);
            return '"' + d + '":"' + key + '"';
        })
            .join(", \n");
        // 格式化
        return JSON.stringify(JSON.parse("{" + rus + "}"), null, 2);
    }
    Object.getOwnPropertyNames(swagger.paths).forEach(function (api) {
        // api , url, /api/user/..
        var oneApi = swagger.paths[api];
        var methodOption = (tsOption[api] = {});
        // get, post
        Object.getOwnPropertyNames(oneApi).forEach(function (method) {
            methodOption[method] = {
                parameters: parameters(oneApi[method].parameters),
                responses: response(oneApi[method].responses),
                name: getName(oneApi[method].summary),
                summary: oneApi[method].summary
            };
        });
        config.name = getNameConfigTs();
    });
    // 分析tsOption得到ts file.
    var tsSporeStr = analy_1.analy(tsOption, peerConfig.headStr);
    return {
        nameConfig: config.name,
        tsSporeStr: tsSporeStr,
        tsOption: tsOption
    };
}
exports.Peer = Peer;
//# sourceMappingURL=peer.js.map