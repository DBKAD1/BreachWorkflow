import { Injectable } from '@angular/core';
import {HttpClient , HttpResponse} from "@angular/common/http";
import 'rxjs/add/operator/map';
import {WorkflowModel} from "../models/workflow-model";
import { Observable,  of, observable } from 'rxjs';
import {map,catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BpmpnWorkflowService {
  

  constructor(private httpService: HttpClient) { }
  public loadedWorkFlow:WorkflowModel;

  public getWorkflows(): Observable<WorkflowModel[]> {
    return this.httpService.get<WorkflowModel[]>(`http://localhost:3000/workflows`).pipe(
      map(data => data.map(data => new WorkflowModel().deserialize(data)))
    );

  }
  public addWorkflow(): Observable<WorkflowModel> {
    var response=this.httpService.post<WorkflowModel>(`http://localhost:3000/workflows`,
    JSON.stringify(this.loadedWorkFlow),  { headers: { 'Content-Type': 'application/json' } }).pipe(
     catchError(this.handleError('updateWorkflow', this.loadedWorkFlow))

    );
    return response;
  }
  public saveWorkflow(): Observable<WorkflowModel> {
    var response=this.httpService.put<WorkflowModel>(`http://localhost:3000/workflows/:${this.loadedWorkFlow.id}`,
     JSON.stringify(this.loadedWorkFlow),  { headers: { 'Content-Type': 'application/json' } }).pipe(
      catchError(this.handleError('updateHero', this.loadedWorkFlow))

     );
     return response;


  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
    //  this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
