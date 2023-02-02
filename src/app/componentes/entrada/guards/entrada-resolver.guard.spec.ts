import { TestBed } from '@angular/core/testing';

import { EntradaResolverGuard } from './entrada-resolver.guard';

describe('EntradaResolverGuard', () => {
  let guard: EntradaResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EntradaResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
