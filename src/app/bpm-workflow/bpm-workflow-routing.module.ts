import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkflowViewerComponent } from './workflow-viewer/workflow-viewer.component';
import { WorkflowDashboardComponent } from './workflow-dashboard/workflow-dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: WorkflowDashboardComponent
  },
  {
    path: 'viewer',
    component: WorkflowViewerComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class BpmWorkflowRoutingModule {
}

