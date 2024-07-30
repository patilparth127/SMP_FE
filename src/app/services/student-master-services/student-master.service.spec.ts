import { TestBed } from '@angular/core/testing';

import { StudentMasterService } from './student-master.service';

describe('StudentMasterService', () => {
  let service: StudentMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
