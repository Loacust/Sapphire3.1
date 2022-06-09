import { TestBed } from '@angular/core/testing';

import { EditortransferService } from './editortransfer.service';

describe('EditortransferService', () => {
  let service: EditortransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditortransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
