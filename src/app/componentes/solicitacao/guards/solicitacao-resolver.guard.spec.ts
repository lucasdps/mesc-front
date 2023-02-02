import { TestBed } from '@angular/core/testing';

import { SolicitacaoResolverGuard } from './solicitacao-resolver.guard';

describe('SolicitacaoResolverGuard', () => {
  let guard: SolicitacaoResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SolicitacaoResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
