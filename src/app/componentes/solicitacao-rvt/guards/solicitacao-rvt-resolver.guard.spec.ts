import { TestBed } from '@angular/core/testing';

import { SolicitacaoRvtResolverGuard } from './solicitacao-rvt-resolver.guard';

describe('SolicitacaoRvtResolverGuard', () => {
  let guard: SolicitacaoRvtResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SolicitacaoRvtResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
