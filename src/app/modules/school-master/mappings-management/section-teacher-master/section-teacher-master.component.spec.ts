import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTeacherMasterComponent } from './section-teacher-master.component';

describe('SectionTeacherMasterComponent', () => {
  let component: SectionTeacherMasterComponent;
  let fixture: ComponentFixture<SectionTeacherMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionTeacherMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionTeacherMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
