import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrazoAtendimentoFormComponent } from './prazo-atendimento-form.component';

describe('PrazoAtendimentoFormComponent', () => {
  let component: PrazoAtendimentoFormComponent;
  let fixture: ComponentFixture<PrazoAtendimentoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrazoAtendimentoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrazoAtendimentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
