import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaFormComponent } from './entrada-form.component';

describe('EntradaFormComponent', () => {
  let component: EntradaFormComponent;
  let fixture: ComponentFixture<EntradaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntradaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
