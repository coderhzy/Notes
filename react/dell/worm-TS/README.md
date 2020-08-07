# 爬虫

## 项目创建
```
mkdir worm-TS
cd worm-TS
npm init -y
tsc --init
npm install -D ts-node

package.json
  "scripts": {
    "dev": "ts-node ./src/crowller.ts"
  },

npm install typescript -D

```



**获取html内容**
npm install superagent --save

**ts -> .d.ts翻译文件 ->js**
npm install @types/superagent

**获取html某个部分内容**
npm install cheerio --save