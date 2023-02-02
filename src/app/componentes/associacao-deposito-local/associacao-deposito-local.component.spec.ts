import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociacaoDepositoLocalComponent } from './associacao-deposito-local.component';

describe('AssociacaoDepositoLocalComponent', () => {
  let component: AssociacaoDepositoLocalComponent;
  let fixture: ComponentFixture<AssociacaoDepositoLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociacaoDepositoLocalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociacaoDepositoLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
