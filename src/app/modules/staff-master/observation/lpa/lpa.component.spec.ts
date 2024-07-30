import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpaComponent } from './lpa.component';

describe('LpaComponent', () => {
  let component: LpaComponent;
  let fixture: ComponentFixture<LpaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LpaComponent]
    });
    fixture = TestBed.createComponent(LpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
