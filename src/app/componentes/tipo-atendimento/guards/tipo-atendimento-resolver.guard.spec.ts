import { TestBed } from '@angular/core/testing';

import { TipoAtendimentoResolverGuard } from './tipo-atendimento-resolver.guard';

describe('TipoAtendimentoResolverGuard', () => {
  let guard: TipoAtendimentoResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TipoAtendimentoResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
