import { Injectable } from '@angular/core';
import {HttpClient , HttpResponse,HttpHeaders,HttpParams} from "@angular/common/http";
import 'rxjs/add/operator/map';
import {Activiti} from "../models/activiti.model";
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
        'Authorization': 'Basic YWRtaW46YWRtaW4='
      }),
      params: new HttpParams().set('program_id', "sdsdprogram_id")

    };
    return this.httpService.get<Activiti[]>(`http://51.140.158.69:8080/repository/process-definitions`,httpOptions).pipe(
      map(data => data.map(data => new Activiti().deserialize(data)))
    );

  }
}
