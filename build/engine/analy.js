"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Auto {
    constructor() {
        this.value = [];
    }
    addApi(apiUrl, name, method, summary) {
        method = safeMethod(method);
        this.value.push(`\n// ${summary}\n${name} : ${name}Types.${method}("${apiUrl}"),\n`);
    }
    getValue() {
        return "export const auto = {\n " + this.value.join(" ") + "}";
    }
}
function safeMethod(method) {
    if (method === "delete") {
        return "del";
    }
    else {
        return method;
    }
}
class OneName {
    constructor(apiUrl, method) {
        this.param = ["path", "query", "header", "body"];
        this.apiUrl = apiUrl;
        this.method = safeMethod(method);
    }
    buildOneApi(p) {
        const start = `// ${p.summary}\n export namespace ${p.name}Types {\n  `;
        const paramRules = [];
        for (const x of this.param) {
            if (p.parameters[x]) {
                paramRules.push(this.buildOneParameter(x, p.parameters[x]));
            }
            else {
                paramRules.push(this.buildOneParameter(x, "{}"));
            }
        }
        const response = this.buildResponse(p.responses);
        return (start +
            paramRules.join(" ") +
            response +
            this.buildChecked() +
            this.buildMethod(this.method) +
            "}");
    }
    // parameters
    buildOneParameter(param, value) {
        let transValue = "";
        if (typeof value === "object") {
            transValue = "{  \n" + value.join("  ") + "}";
        }
        else {
            transValue = value;
        }
        return `export type ${param} = ${transValue};\n`;
    }
    sporeOneResonse(resName) {
        const response = [];
        return {
            push(d) {
                response.push(d);
            },
            getValue() {
                const resCode = response.map(d => d.code);
                const resValue = response.map(d => d.value);
                const resRus = {
                    code: "// " + resCode.join("|") + "\n",
                    value: resValue.join(" | ") || "{}"
                };
                const resStr = `${resRus.code}export type ${resName} = ${resRus.value}\n`;
                return resStr;
            }
        };
    }
    buildResponse(obj) {
        const okResponse = this.sporeOneResonse("response");
        const wrongResonse = this.sporeOneResonse("ominous");
        for (const xCode in obj) {
            const spore = {
                code: xCode,
                // 检查数据的格式'{...}'
                value: obj[xCode][0] === "{" ? obj[xCode] : "{}"
            };
            if (xCode < "300") {
                okResponse.push(spore);
            }
            else {
                wrongResonse.push(spore);
            }
        }
        // response , ominous;
        return okResponse.getValue() + wrongResonse.getValue();
    }
    buildMethod(method) {
        return `export const ${method} = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).${method}\n`;
    }
    buildChecked() {
        return `export type checked = checki<any> | checki<response>\n`;
    }
}
function analy(tsOption, headStr) {
    const nameCollector = [];
    const auto = new Auto();
    for (const api in tsOption) {
        const oneApi = tsOption[api];
        for (const method in oneApi) {
            const oneN = new OneName(api, method).buildOneApi(oneApi[method]);
            nameCollector.push(oneN);
            auto.addApi(api, oneApi[method].name, method, oneApi[method].summary);
        }
    }
    return headStr + nameCollector.join("\n\n") + auto.getValue();
}
exports.analy = analy;
/*

// [summary]
export namespace 'name'+ 'Types' {
  export type [parameter1] = '{}'; // path
  export type [parameter1] = '{}'; // body
  export type [method]_[parameter1] = '{}'; // header

  export type [method]_[response] = [codeType] | []

  export const [method1] = (apiUrl:string) => { Api<path&query, body, response>(apiUrl).[method1] );
}

export const auto = {
  [name] : [nameTypes].[method](apiUrl),
}

*/
