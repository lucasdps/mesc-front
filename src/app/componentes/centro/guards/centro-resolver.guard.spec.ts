import { TestBed } from '@angular/core/testing';

import { CentroResolverGuard } from './centro-resolver.guard';

describe('CentroResolverGuard', () => {
  let guard: CentroResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CentroResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
