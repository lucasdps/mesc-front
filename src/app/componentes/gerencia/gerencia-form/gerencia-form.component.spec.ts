import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciaFormComponent } from './gerencia-form.component';

describe('GerenciaFormComponent', () => {
  let component: GerenciaFormComponent;
  let fixture: ComponentFixture<GerenciaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
