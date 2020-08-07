// ts -> .d.ts翻译文件 ->js

import superagent, { propfind } from 'superagent';
import fs from 'fs';
import path from 'path';
import hello from './hello'

export interface codehzyer {
  codehzy: (html: string, filePath: string) => string;
}


class Crowller {
  private filePath = path.resolve(__dirname, '../data/result.json');


  // 获取html内容
  async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }


  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

  async initSpiderProcess() {
    const html = await this.getRawHtml();
    const fileContent = this.codehzyer.codehzy(html, this.filePath);
    this.writeFile(fileContent);
  }


  constructor(private url: string, private codehzyer: codehzyer) {
    this.initSpiderProcess();
  }
}

const url = `https://coding.imooc.com/class/229.html`;
const codehzyer = new hello(); new Crowller(url, codehzyer);