import { Injectable } from '@angular/core';
import {HttpClient , HttpResponse,HttpHeaders,HttpParams} from "@angular/common/http";
import 'rxjs/add/operator/map';
import {Activiti} from "../models/activiti.model";
import {AtivitiResponse} from "../models/ativiti-response.model";

import { Observable,  of, observable } from 'rxjs';
import {map,catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ActivitiService {

  constructor(private httpService: HttpClient) { }
  public getWorkflows(): Observable<Activiti[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic YWRtaW46YWRtaW4=',
        'Access-Control-Allow-Origin':'*'
      }),
      params: new HttpParams().set('program_id', "sdsdprogram_id")

    };
    var t=this.httpService.get(`http://51.140.158.69:8080/repository/process-definitions`,httpOptions)
    .subscribe(data => {
      console.log(data);
    });
    return this.httpService.get<AtivitiResponse>(`http://51.140.158.69:8080/repository/process-definitions`,httpOptions).
     map(data => data.data);

  }
}
