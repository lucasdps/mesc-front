import { TestBed } from '@angular/core/testing';

import { DepositoResolverGuard } from './deposito-resolver.guard';

describe('DepositoResolverGuard', () => {
  let guard: DepositoResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DepositoResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
