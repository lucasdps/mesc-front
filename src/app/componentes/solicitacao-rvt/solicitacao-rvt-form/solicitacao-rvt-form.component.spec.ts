import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoRvtFormComponent } from './solicitacao-rvt-form.component';

describe('SolicitacaoRvtFormComponent', () => {
  let component: SolicitacaoRvtFormComponent;
  let fixture: ComponentFixture<SolicitacaoRvtFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitacaoRvtFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitacaoRvtFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
