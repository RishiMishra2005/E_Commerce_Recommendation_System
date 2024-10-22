import { TestBed } from '@angular/core/testing';

import { ProductsWithApiService } from './products-with-api.service';

describe('ProductsWithApiService', () => {
  let service: ProductsWithApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsWithApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
