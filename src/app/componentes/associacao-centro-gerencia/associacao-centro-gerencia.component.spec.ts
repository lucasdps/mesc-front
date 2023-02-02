import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociacaoCentroGerenciaComponent } from './associacao-centro-gerencia.component';

describe('AssociacaoCentroGerenciaComponent', () => {
  let component: AssociacaoCentroGerenciaComponent;
  let fixture: ComponentFixture<AssociacaoCentroGerenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociacaoCentroGerenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociacaoCentroGerenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
