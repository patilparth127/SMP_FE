import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalSubSkillComponent } from './goal-sub-skill.component';

describe('GoalSubSkillComponent', () => {
  let component: GoalSubSkillComponent;
  let fixture: ComponentFixture<GoalSubSkillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoalSubSkillComponent]
    });
    fixture = TestBed.createComponent(GoalSubSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
