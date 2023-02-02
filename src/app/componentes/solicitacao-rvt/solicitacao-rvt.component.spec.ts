import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoRvtComponent } from './solicitacao-rvt.component';

describe('SolicitacaoRvtComponent', () => {
  let component: SolicitacaoRvtComponent;
  let fixture: ComponentFixture<SolicitacaoRvtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitacaoRvtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitacaoRvtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
