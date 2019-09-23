import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BpmpnWorkflowService } from "../../shared/services/bpmpn-workflow.service";
import { WorkflowModel } from "../../shared/models/workflow-model";

@Component({
  selector: 'ngx-workflow-dashboard',
  templateUrl: './workflow-dashboard.component.html',
  styleUrls: ['./workflow-dashboard.component.scss']
})
export class WorkflowDashboardComponent implements OnInit {
  workflows: WorkflowModel[];
  constructor(private workFlowService: BpmpnWorkflowService, private route: Router) { }

  ngOnInit() {
    var a = this.workFlowService.getWorkflows
    ().subscribe(
      (x: WorkflowModel[]) => {
        console.log('Fetched Workflows, now importing: ', x);
        this.workflows = x;
      },
      this.handleError
    );
  }
  handleError(err: any) {
    if (err) {
      console.warn('Ups, error: ', err);
    }
  }
  addWorkflow() {
    const workflow: WorkflowModel= <WorkflowModel>{name:'New Workflow',bpmnXml64:''};
    this.workFlowService.loadedWorkFlow = workflow;
    this.route.navigate(['/pages/workflow-viewer/veiwer'], { state: { data: { workflow } } });
  }


  onEdit(workflow: WorkflowModel) {
    var bpm = workflow;
    this.workFlowService.loadedWorkFlow = workflow;
    this.route.navigate(['/pages/workflow-viewer/veiwer'], { state: { data: { workflow } } });

  }
}
