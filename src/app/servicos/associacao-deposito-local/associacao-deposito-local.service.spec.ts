import { TestBed } from '@angular/core/testing';

import { AssociacaoDepositoLocalService } from './associacao-deposito-local.service';

describe('AssociacaoDepositoLocalService', () => {
  let service: AssociacaoDepositoLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssociacaoDepositoLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
