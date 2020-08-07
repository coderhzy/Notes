import cheeio from 'cheerio';
import fs from 'fs';
import { codehzyer } from './crowller'

interface RightContext {
  title: string,
  list: Object
}

interface rightTitleResult {
  time: number;
  data: RightContext[];
}

interface Content {
  [propName: number]: RightContext[];
}

export default class CodeHzy implements codehzyer {
  // getJsonInfo
  private getJsonInfo(html: string) {
    const $ = cheeio.load(html);
    const blogInfo = $('.widget');
    const rightTitle: RightContext[] = [];
    blogInfo.map((index, element) => {
      // const badge = $(element).find('.badge');
      // const aircleCount = badge.text();
      // console.log(aircleCount);

      // 获取标题
      const title = $(element).find('.widget-title').text();
      const list = $(element).find('.widget-list li').text().split(':').toString();

      rightTitle.push({ title, list });
    })
    return {
      time: (new Date()).getTime(),
      data: rightTitle
    }
  }


  //存储到json文件
  generateJsonContent(result: rightTitleResult, filePath: string) {
    let fileContent: Content = {};
    // 判断是否有result这个文件
    if (fs.existsSync(filePath)) {
      // 读取之前数据
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    // 存入之前到result.json
    fileContent[result.time] = result.data;
    return fileContent;
  }

  public codehzy(html: string, filePath: string) {
    const result = this.getJsonInfo(html);
    const fileContent = this.generateJsonContent(result, filePath);
    return JSON.stringify(fileContent)
  }

}