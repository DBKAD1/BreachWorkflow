import { Injectable } from '@angular/core';
import { parseString } from 'xml2js';


@Injectable({
  providedIn: 'root'
})
export class BpmnXmlService {

  constructor() { }

  public getActivitiXml(xmlString: string): string {
    parseString(xmlString, function (err, result) {
      console.log(result);

    });
    return '';
  }
}
