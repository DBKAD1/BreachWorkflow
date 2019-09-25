import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BpmpnWorkflowService } from '../../shared/services/bpmpn-workflow.service';
import { WorkflowModel } from '../../shared/models/workflow-model';

import { ActivitiService } from '../../shared/services/activiti.service';
import { Activiti } from '../../shared/models/activiti.model';

@Component({
  selector: 'app-workflow-dashboard',
  templateUrl: './workflow-dashboard.component.html',
  styleUrls: ['./workflow-dashboard.component.scss']
})
export class WorkflowDashboardComponent implements OnInit {
  workflows: WorkflowModel[];
  constructor(private workFlowService: BpmpnWorkflowService,
    private activitiService: ActivitiService,
     private route: Router) { }

  ngOnInit() {
    const a = this.workFlowService.getWorkflows
    ().subscribe(
      (x: WorkflowModel[]) => {
        console.log('Fetched Workflows, now importing: ', x);
        this.workflows = x;
      },
      this.handleError
    );

    const b = this.activitiService.getWorkflows
    ().subscribe(
      (x: Activiti[]) => {
        console.log('Fetched Workflows, now importing: ', x);
       const processes = x;
       console.log(processes);
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
    const workflow: WorkflowModel = <WorkflowModel>{name: 'New Workflow', bpmnXml64: ''};
    this.workFlowService.loadedWorkFlow = workflow;
    this.route.navigate(['/bpm-workflow/viewer'], { state: { data: { workflow } } });
  }


  onEdit(workflow: WorkflowModel) {
    const bpm = workflow;
    this.workFlowService.loadedWorkFlow = workflow;
    this.route.navigate(['/bpm-workflow/viewer'], { state: { data: { workflow } } });

  }
}
