import { TestBed } from '@angular/core/testing';

import { ActivitiService } from './activiti.service';

describe('ActivitiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivitiService = TestBed.get(ActivitiService);
    expect(service).toBeTruthy();
  });
});
