import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterPageComponent } from '../../../../components/master-page/master-page.component';
import { SharedService } from '../../../../services/shared.service';
import { OtherDetailsComponent } from '../other-details/other-details.component';
import { ParentsDetailsComponent } from '../parents-details/parents-details.component';
import { StudentPersonalDetailsComponent } from '../student-personal-details/student-personal-details.component';

@Component({
  selector: 'app-student-registration-form',
  standalone: true,
  templateUrl: './student-registration-form.component.html',
  styleUrl: './student-registration-form.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MasterPageComponent,
    StudentPersonalDetailsComponent,
    ParentsDetailsComponent,
    OtherDetailsComponent,
  ],
})
export class StudentRegistrationFormComponent {
  constructor(private sharedService: SharedService, private router: Router, private route: ActivatedRoute) { sessionStorage.removeItem('insertedStudentID'); }
  
  reload() {
    this.sharedService.reloadComponent();
  }
}
