import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalSkillComponent } from './goal-skill.component';

describe('GoalSkillComponent', () => {
  let component: GoalSkillComponent;
  let fixture: ComponentFixture<GoalSkillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoalSkillComponent]
    });
    fixture = TestBed.createComponent(GoalSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
