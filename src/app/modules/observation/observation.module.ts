import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributesComponent } from './attributes/attributes.component';
import { CategoryComponent } from './category/category.component';
import { GoalSkillComponent } from './goal-skill/goal-skill.component';
import { GoalSubSkillComponent } from './goal-sub-skill/goal-sub-skill.component';
import { LpaComponent } from './lpa/lpa.component';
import { MailNotificationComponent } from './mail-notification/mail-notification.component';
import { QuestionsComponent } from './questions/questions.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
//import { ObservationComponent } from './observation.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterPageComponent } from '../../../components/master-page/master-page.component';
import { ObservationComponent } from './observation.component';

export const routes: Routes = [
  {path : 'observation',component:ObservationComponent},
  { path: '', redirectTo: 'observation', pathMatch: 'full' },
]
@NgModule({
  // declarations: [   CategoryComponent,
  //   SubCategoryComponent,
  //   AttributesComponent,
  //   QuestionsComponent,
  //   MailNotificationComponent,
  //   GoalSkillComponent,
  //   GoalSubSkillComponent,
  //   LpaComponent],
  imports: [
    FormsModule,ReactiveFormsModule,
    CommonModule,RouterModule.forChild(routes),MasterPageComponent
  ]
})
export class ObservationModule { }
