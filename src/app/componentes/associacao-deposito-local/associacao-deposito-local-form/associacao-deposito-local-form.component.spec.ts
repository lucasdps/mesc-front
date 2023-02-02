import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociacaoDepositoLocalFormComponent } from './associacao-deposito-local-form.component';

describe('AssociacaoDepositoLocalFormComponent', () => {
  let component: AssociacaoDepositoLocalFormComponent;
  let fixture: ComponentFixture<AssociacaoDepositoLocalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociacaoDepositoLocalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociacaoDepositoLocalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
