import { TestBed } from '@angular/core/testing';

import { GerenciaResolverGuard } from './gerencia-resolver.guard';

describe('GerenciaResolverGuard', () => {
  let guard: GerenciaResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GerenciaResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
