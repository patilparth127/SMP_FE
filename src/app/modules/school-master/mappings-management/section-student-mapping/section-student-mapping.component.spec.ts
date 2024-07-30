import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionStudentMappingComponent } from './section-student-mapping.component';

describe('SectionStudentMappingComponent', () => {
  let component: SectionStudentMappingComponent;
  let fixture: ComponentFixture<SectionStudentMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionStudentMappingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionStudentMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
