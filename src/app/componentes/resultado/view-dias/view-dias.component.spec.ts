import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDiasComponent } from './view-dias.component';

describe('ViewDiasComponent', () => {
  let component: ViewDiasComponent;
  let fixture: ComponentFixture<ViewDiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
