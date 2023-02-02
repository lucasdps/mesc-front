import { TestBed } from '@angular/core/testing';

import { AssociacaoCentroGerenciaService } from './associacao-centro-gerencia.service';

describe('AssociacaoCentroGerenciaService', () => {
  let service: AssociacaoCentroGerenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssociacaoCentroGerenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
