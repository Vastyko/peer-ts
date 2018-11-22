var Auto = /** @class */ (function () {
    function Auto() {
        this.value = [];
    }
    Auto.prototype.addApi = function (apiUrl, name, method, summary) {
        method = safeMethod(method);
        this.value.push("\n// " + summary + "\n" + name + " : " + name + "Types." + method + "(\"" + apiUrl + "\"),\n");
    };
    Auto.prototype.getValue = function () {
        return "export const auto = {\n " + this.value.join(" ") + "}";
    };
    return Auto;
}());
function safeMethod(method) {
    if (method === "delete") {
        return "del";
    }
    else {
        return method;
    }
}
var OneName = /** @class */ (function () {
    function OneName(apiUrl, method) {
        this.param = ["path", "query", "header", "body"];
        this.apiUrl = apiUrl;
        this.method = safeMethod(method);
    }
    OneName.prototype.buildOneApi = function (p) {
        var start = "// " + p.summary + "\n export namespace " + p.name + "Types {\n  ";
        var paramRules = [];
        for (var _i = 0, _a = this.param; _i < _a.length; _i++) {
            var x = _a[_i];
            if (p.parameters[x]) {
                paramRules.push(this.buildOneParameter(x, p.parameters[x]));
            }
            else {
                paramRules.push(this.buildOneParameter(x, "{}"));
            }
        }
        var response = this.buildResponse(p.responses);
        return (start +
            paramRules.join(" ") +
            response +
            this.buildChecked() +
            this.buildMethod(this.method) +
            "}");
    };
    // parameters
    OneName.prototype.buildOneParameter = function (param, value) {
        var transValue = "";
        if (typeof value === "object") {
            transValue = "{  \n" + value.join("  ") + "}";
        }
        else {
            transValue = value;
        }
        return "export type " + param + " = " + transValue + ";\n";
    };
    OneName.prototype.sporeOneResonse = function (resName) {
        var response = [];
        return {
            push: function (d) {
                response.push(d);
            },
            getValue: function () {
                var resCode = response.map(function (d) { return d.code; });
                var resValue = response.map(function (d) { return d.value; });
                var resRus = {
                    code: "// " + resCode.join("|") + "\n",
                    value: resValue.join(" | ") || "{}"
                };
                var resStr = resRus.code + "export type " + resName + " = " + resRus.value + "\n";
                return resStr;
            }
        };
    };
    OneName.prototype.buildResponse = function (obj) {
        var okResponse = this.sporeOneResonse("response");
        var wrongResonse = this.sporeOneResonse("ominous");
        for (var xCode in obj) {
            var spore = {
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
    };
    OneName.prototype.buildMethod = function (method) {
        return "export const " + method + " = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl)." + method + "\n";
    };
    OneName.prototype.buildChecked = function () {
        return "export type checked = checki<any> | checki<response>\n";
    };
    return OneName;
}());
export function analy(tsOption, headStr) {
    var nameCollector = [];
    var auto = new Auto();
    for (var api in tsOption) {
        var oneApi = tsOption[api];
        for (var method in oneApi) {
            var oneN = new OneName(api, method).buildOneApi(oneApi[method]);
            nameCollector.push(oneN);
            auto.addApi(api, oneApi[method].name, method, oneApi[method].summary);
        }
    }
    return headStr + nameCollector.join("\n\n") + auto.getValue();
}
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
//# sourceMappingURL=analy.js.map