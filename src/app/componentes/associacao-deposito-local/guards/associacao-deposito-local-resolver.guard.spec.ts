import { TestBed } from '@angular/core/testing';

import { AssociacaoDepositoLocalResolverGuard } from './associacao-deposito-local-resolver.guard';

describe('AssociacaoDepositoLocalResolverGuard', () => {
  let guard: AssociacaoDepositoLocalResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AssociacaoDepositoLocalResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
