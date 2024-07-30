import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterPageComponent } from './components/master-page/master-page.component';
import { LoginComponent } from './modules/authentication/login/login.component';
import { AcademicBoardComponent } from './modules/school-master/academic-master/academic-board/academic-board.component';
import { AcademicMasterComponent } from './modules/school-master/academic-master/academic-master/academic-master.component';
import { AcademicProgramComponent } from './modules/school-master/academic-master/academic-program/academic-program.component';
import { AcademicTermComponent } from './modules/school-master/academic-master/academic-term/academic-term.component';
import { AcademicYearComponent } from './modules/school-master/academic-master/academic-year/academic-year.component';
import { SectionComponent } from './modules/school-master/academic-master/section/section.component';
import { SectionStudentMappingComponent } from './modules/school-master/mappings-management/section-student-mapping/section-student-mapping.component';
import { SectionTeacherMasterComponent } from './modules/school-master/mappings-management/section-teacher-master/section-teacher-master.component';
import { OrganizationalMasterComponent } from './modules/school-master/organizational-master/organizational-master/organizational-master.component';
import { StaffDetailsComponent } from './modules/staff-master/staff-details/staff-details/staff-details.component';
import { StaffListComponent } from './modules/staff-master/staff-list/staff-list/staff-list.component';
import { StudentDetailsComponent } from './modules/student-master/student-details/student-details.component';
import { StudentListComponent } from './modules/student-master/student-list/student-list.component';
import { StudentRegistrationFormComponent } from './modules/student-master/student-registration/student-registration-form/student-registration-form.component';
import { ObservationComponent } from './modules/staff-master/observation/observation.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: MasterPageComponent },
  { path: 'academic-year', component: AcademicYearComponent },
  { path: 'academic-term', component: AcademicTermComponent },
  { path: 'academic-board', component: AcademicBoardComponent },
  { path: 'academic-program', component: AcademicProgramComponent },
  { path: 'academic-master', component: AcademicMasterComponent },
  { path: 'section', component: SectionComponent },
  { path: 'student-registration-form', component: StudentRegistrationFormComponent },
  { path: 'student-details', component: StudentDetailsComponent },
  { path: 'student-list', component: StudentListComponent },
  { path: 'staff-list', component: StaffListComponent },
  { path: 'staff-details', component: StaffDetailsComponent },
  { path: 'organizational-master', component: OrganizationalMasterComponent },
  { path: 'section-teacher-mapping', component: SectionTeacherMasterComponent },
  { path: 'section-student-mapping', component: SectionStudentMappingComponent },
  {path : 'observation',component : ObservationComponent}
  // {
  //   path: 'observation',
  //   loadChildren: () => import('./modules/staff-master/observation/observation.module').then((m) => m.ObservationModule),
  // },
  
  // { path: 'student-basic-details', component: StudentPersonalDetailsComponent },
  // { path: 'parents-details', component: ParentsDetailsComponent },
  // { path: 'student-other-details', component: StudentOtherDetailsModel },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
