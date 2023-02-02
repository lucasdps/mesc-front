import { TestBed } from '@angular/core/testing';

import { PrazoAtendimentoService } from './prazo-atendimento.service';

describe('PrazoAtendimentoService', () => {
  let service: PrazoAtendimentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrazoAtendimentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
