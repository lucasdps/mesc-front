import { TestBed } from '@angular/core/testing';

import { LocalResolverGuard } from './local-resolver.guard';

describe('LocalResolverGuard', () => {
  let guard: LocalResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LocalResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
