import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userGuardGuard } from './user-guard.guard';

describe('userGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
