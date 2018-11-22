# 本地安装, 开发的依赖安装.

yarn add peer.ts --dev;

# 原理

apib => swagger.json => tsOption => Typescript Spore;

# 添加配置文件 在根目录下添加 peer.config.json;

```js
{

  // 读取和写入文件名配置.
  "nameConfig": "./name.json",

  "apibPath": "./apib",

  "output": "./output/Spore.ts",

  // 文件头部的
  "headStr": "import { Spore } from \"../http/region\";\nimport { checki } from \"../../utils/checkOperator\";\n type integer = number;",


  "exceptHeaders": {
    // 注释掉的header 字段
    "Content-Type": "annotation"
  }

  // 输出的NameConfig路径, 可选的.
  "outputNameConfig": "./outNameConfig.json",
}

// peer.config.json example
{
  "nameConfig": "./name.json",
  "apibPath": "./api.md",
  "headStr": "import { Spore } from \"../http/region\";\nimport { checki } from \"../../utils/checkOperator\";\n type integer = number;",
  "output": "./Spore.ts",
  "outputNameConfig": "./outNameConfig.json",
  "exceptHeaders": {
    "Content-Type": "annotation"
  },
  "loggerDir": "./"
}

```

## 注意!

1. Peer.ts 不提供格式化. 请使用 Prettier 格式化.
