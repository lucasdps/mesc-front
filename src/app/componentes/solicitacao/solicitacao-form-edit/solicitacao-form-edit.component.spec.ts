import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoFormEditComponent } from './solicitacao-form-edit.component';

describe('SolicitacaoFormEditComponent', () => {
  let component: SolicitacaoFormEditComponent;
  let fixture: ComponentFixture<SolicitacaoFormEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitacaoFormEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitacaoFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
