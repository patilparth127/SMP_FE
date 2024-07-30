import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicMasterComponent } from './academic-master.component';

describe('AcademicMasterComponent', () => {
  let component: AcademicMasterComponent;
  let fixture: ComponentFixture<AcademicMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcademicMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
