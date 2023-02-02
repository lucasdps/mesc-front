import { TestBed } from '@angular/core/testing';

import { PrazoAtendimentoResolverGuard } from './prazo-atendimento-resolver.guard';

describe('PrazoAtendimentoResolverGuard', () => {
  let guard: PrazoAtendimentoResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PrazoAtendimentoResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
