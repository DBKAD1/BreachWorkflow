import { TestBed } from '@angular/core/testing';

import { BpmpnWorkflowService } from './bpmpn-workflow.service';

describe('BpmpnWorkflowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BpmpnWorkflowService = TestBed.get(BpmpnWorkflowService);
    expect(service).toBeTruthy();
  });
});
