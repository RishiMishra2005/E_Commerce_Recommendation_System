import { TestBed } from '@angular/core/testing';

import { DataTransferServiceService } from './data-transfer-service.service';

describe('DataTransferServiceService', () => {
  let service: DataTransferServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataTransferServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
