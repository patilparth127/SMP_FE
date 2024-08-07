import { Component,  TemplateRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { AttributesComponent } from './attributes/attributes.component';
import { GoalSkillComponent } from './goal-skill/goal-skill.component';
import { GoalSubSkillComponent } from './goal-sub-skill/goal-sub-skill.component';
import { LpaComponent } from './lpa/lpa.component';
import { MailNotificationComponent } from './mail-notification/mail-notification.component';
import { QuestionsComponent } from './questions/questions.component';
import { CategoryComponent } from './category/category.component';
import { MasterPageComponent } from '../../components/master-page/master-page.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MasterPageComponent,
    CategoryComponent,
    SubCategoryComponent,
    AttributesComponent,
    QuestionsComponent,
    MailNotificationComponent,
    GoalSkillComponent,
    GoalSubSkillComponent,
    LpaComponent,
  ],
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.css'],
})
export class ObservationComponent {

  @ViewChild('categoryTemplate') categoryTemplate!: TemplateRef<any>;
  @ViewChild('subCategoryTemplate') subCategoryTemplate!: TemplateRef<any>;
  @ViewChild('attributesTemplate') attributesTemplate!: TemplateRef<any>;
  @ViewChild('questionsTemplate') questionsTemplate!: TemplateRef<any>;
  @ViewChild('mailNotificationTemplate') mailNotificationTemplate!: TemplateRef<any>;
  @ViewChild('goalSkillTemplate') goalSkillTemplate!: TemplateRef<any>;
  @ViewChild('goalSubSkillTemplate') goalSubSkillTemplate!: TemplateRef<any>;
  @ViewChild('lpaTemplate') lpaTemplate!: TemplateRef<any>;

  tabs: any[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.tabs = [
        {
          id: 'base-justified-home',
          title: 'Category',
          template: this.categoryTemplate,
          active: true,
        },
        {
          id: 'base-justified-product',
          title: 'Sub Category',
          template: this.subCategoryTemplate,
          active: false,
        },
        {
          id: 'base-justified-messages',
          title: 'Attributes',
          template: this.attributesTemplate,
          active: false,
        },
        {
          id: 'base-justified-settings',
          title: 'Questions',
          template: this.questionsTemplate,
          active: false,
        },
        {
          id: 'base-justified-settings',
          title: 'Mail Notification',
          template: this.mailNotificationTemplate,
          active: false,
        },
        {
          id: 'base-justified-settings',
          title: 'Goal Skill',
          template: this.goalSkillTemplate,
          active: false,
        },
        {
          id: 'base-justified-settings',
          title: 'Goal Sub Skill',
          template: this.goalSubSkillTemplate,
          active: false,
        },
        {
          id: 'base-justified-settings',
          title: 'LPA',
          template: this.lpaTemplate,
          active: false,
        },
      ];
      this.cdr.detectChanges();
    }, 100);
  }

  onTabChange(tab : any): void {
    this.tabs.forEach(t => t.active = false);
    tab.active = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
