import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositoFormComponent } from './deposito-form.component';

describe('DepositoFormComponent', () => {
  let component: DepositoFormComponent;
  let fixture: ComponentFixture<DepositoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
