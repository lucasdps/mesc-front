import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAtendimentoFormComponent } from './tipo-atendimento-form.component';

describe('TipoAtendimentoFormComponent', () => {
  let component: TipoAtendimentoFormComponent;
  let fixture: ComponentFixture<TipoAtendimentoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoAtendimentoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoAtendimentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
