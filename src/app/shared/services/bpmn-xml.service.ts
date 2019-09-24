import { Injectable } from '@angular/core';
import { parseString, tagNameProcessors } from 'xml2js';


@Injectable({
  providedIn: 'root'
})
export class BpmnXmlService {

  constructor() { }

  public getActivitiXml(xmlString: string): string {
    parseString(xmlString, { tagNameProcessors: [ this.removePrefix ] }, function (err, result) {
      console.log(result);
    });
    return '';
  }
  public removePrefix(inputstring: string): string {
        if (inputstring.indexOf(':') > 0) {
            const result = inputstring.substring(inputstring.indexOf(':') + 1);
            return result;
        } else {
          return inputstring;
        }
  }
}
