import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociacaoCentroGerenciaFormComponent } from './associacao-centro-gerencia-form.component';

describe('AssociacaoCentroGerenciaFormComponent', () => {
  let component: AssociacaoCentroGerenciaFormComponent;
  let fixture: ComponentFixture<AssociacaoCentroGerenciaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociacaoCentroGerenciaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociacaoCentroGerenciaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
