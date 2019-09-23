import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {
  Modeler,
  OriginalPropertiesProvider,
  PropertiesPanelModule,
  InjectionNames,
  OriginalPaletteProvider

} from '../extensions/bpm/bpmn-js/bpmn-js';

import { CustomPropsProvider } from '../extensions/bpm/props-provider/CustomPropsProvider';
import { CustomPaletteProvider } from '../extensions/bpm/props-provider/CustomPaletteProvider';
import { BpmWorkflowRoutingModule } from './bpm-workflow-routing.module';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';

import { WorkflowViewerComponent } from './workflow-viewer/workflow-viewer.component';
import { WorkflowDashboardComponent } from './workflow-dashboard/workflow-dashboard.component';

@NgModule({
  declarations: [WorkflowViewerComponent, WorkflowDashboardComponent],
  imports: [
    BpmWorkflowRoutingModule,
    CommonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:
  [
    WorkflowDashboardComponent,
    WorkflowViewerComponent
  ]
})
export class BpmWorkflowModule { }
