import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {
  Modeler,
  OriginalPropertiesProvider,
  PropertiesPanelModule,
  InjectionNames,
  OriginalPaletteProvider
} from '../../extensions/bpm/bpmn-js/bpmn-js';
import {HttpClient} from '@angular/common/http';

import { CustomPropsProvider } from '../../extensions/bpm/props-provider/CustomPropsProvider';
import { CustomPaletteProvider } from '../../extensions/bpm/props-provider/CustomPaletteProvider';
import { WorkflowModel } from '../../shared/models/workflow-model';
import { BpmpnWorkflowService } from '../../shared/services/bpmpn-workflow.service';
import { BpmnXmlService } from '../../shared/services/bpmn-xml.service';



const customModdle = {
  name: 'customModdle',
  uri: 'http://example.com/custom-moddle',
  prefix: 'custom',
  xml: {
    tagAlias: 'lowerCase'
  },
  associations: [],
  types: [
    {
      'name': 'ExtUserTask',
      'extends': [
        'bpmn:UserTask'
      ],
      'properties': [
        {
          'name': 'worklist',
          'isAttr': true,
          'type': 'String'
        }
      ]
    },
  ]
};

@Component({
  selector: 'app-workflow-viewer',
  templateUrl: './workflow-viewer.component.html',
  styleUrls: ['./workflow-viewer.component.scss']
})
export class WorkflowViewerComponent implements OnInit {

  title = 'Angular/BPMN';
  modeler;
  workflow: WorkflowModel;
  constructor(private http: HttpClient,
    private xmlService: BpmnXmlService,
    private workFlowService: BpmpnWorkflowService,
    private route: Router) {
  }

  ngOnInit(): void {

    this.workflow = <WorkflowModel>history.state.data;
    const bpmxnl = atob(this.workFlowService.loadedWorkFlow.bpmnXml64);
    if (bpmxnl.length < 1) {
      this.load();
    }
    console.log(bpmxnl);
    this.modeler = new Modeler({
      container: '#canvas',
      width: '100%',
      height: '600px',
      additionalModules: [
        PropertiesPanelModule,

        // Re-use original bpmn-properties-module, see CustomPropsProvider
        {[InjectionNames.bpmnPropertiesProvider]: ['type', OriginalPropertiesProvider.propertiesProvider[1]]},
        {[InjectionNames.propertiesProvider]: ['type', CustomPropsProvider]},

        // Re-use original palette, see CustomPaletteProvider
        {[InjectionNames.originalPaletteProvider]: ['type', OriginalPaletteProvider]},
        {[InjectionNames.paletteProvider]: ['type', CustomPaletteProvider]},
      ],
      propertiesPanel: {
        parent: '#properties'
      },
      moddleExtension: {
        custom: customModdle
      }
    });
    this.modeler.importXML(bpmxnl, this.handleError);
  }

  handleError(err: any) {
    if (err) {
      console.warn('Ups, error: ', err);
    }
  }

  load(): void {

    const url = '../assets/bpmn/initial copy.bpmn';
    this.http.get(url, {
      headers: {observe: 'response'}, responseType: 'text'
    }).subscribe(
      (x: any) => {
        console.log('Fetched XML, now importing: ', x);
        this.modeler.importXML(x, this.handleError);
      },
      this.handleError
    );
  }

  save(): void {
    this.modeler.saveXML((err: any, xml: any) => {
      console.log('Result of saving XML: ', err, xml);
      this.xmlService.getActivitiXml(xml);
      this.workFlowService.loadedWorkFlow.bpmnXml64 = btoa(xml);
      if ( this.workFlowService.loadedWorkFlow.id) {
        this.workFlowService.saveWorkflow().subscribe();
        this.route.navigate(['/pages/workflow-viewer']);

      } else {
        this.workFlowService.addWorkflow().subscribe();
        this.route.navigate(['/pages/workflow-viewer']);
      }
    }
    );

  }

}
