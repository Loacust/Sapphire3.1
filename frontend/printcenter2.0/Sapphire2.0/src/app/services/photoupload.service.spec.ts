import { TestBed } from '@angular/core/testing';

import { PhotouploadService } from './photoupload.service';

describe('PhotouploadService', () => {
  let service: PhotouploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotouploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
