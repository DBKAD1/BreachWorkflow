import { TestBed } from '@angular/core/testing';

import { BpmnXmlService } from './bpmn-xml.service';

describe('BpmnXmlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BpmnXmlService = TestBed.get(BpmnXmlService);
    expect(service).toBeTruthy();
  });
});
