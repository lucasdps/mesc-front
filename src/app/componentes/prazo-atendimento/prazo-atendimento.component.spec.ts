import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrazoAtendimentoComponent } from './prazo-atendimento.component';

describe('PrazoAtendimentoComponent', () => {
  let component: PrazoAtendimentoComponent;
  let fixture: ComponentFixture<PrazoAtendimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrazoAtendimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrazoAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
