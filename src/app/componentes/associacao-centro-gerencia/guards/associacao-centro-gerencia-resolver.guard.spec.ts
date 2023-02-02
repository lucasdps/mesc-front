import { TestBed } from '@angular/core/testing';

import { AssociacaoCentroGerenciaResolverGuard } from './associacao-centro-gerencia-resolver.guard';

describe('AssociacaoCentroGerenciaResolverGuard', () => {
  let guard: AssociacaoCentroGerenciaResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AssociacaoCentroGerenciaResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
