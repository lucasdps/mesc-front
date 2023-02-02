import { TestBed } from '@angular/core/testing';

import { SolicitacaoRvtService } from './solicitacao-rvt.service';

describe('SolicitacaoRvtService', () => {
  let service: SolicitacaoRvtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitacaoRvtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
