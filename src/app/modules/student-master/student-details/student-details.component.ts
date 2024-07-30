import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MasterPageComponent } from '../../../components/master-page/master-page.component';
import { StudentMasterModel } from '../../../models/student-master/student.master.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MasterPageComponent],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css',
  providers: [DatePipe],
})
export class StudentDetailsComponent {
  studentDetails!: StudentMasterModel;
  constructor(private datePipe: DatePipe, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.studentDetails = navigation?.extras?.state?.['studentDetails'];
  }
  formatDate_ddMMMyyyy(date: Date | null): string {
    return this.datePipe.transform(date, 'dd MMM yyyy') || '';
  }
  formatAddress(
    houseNo?: string,
    societyName?: string,
    landmark?: string,
    area?: string,
    city?: string,
    zip?: string
  ) {
    const addressParts = [
      houseNo,
      societyName,
      landmark,
      area,
      city,
      zip,
    ];
    return addressParts.filter((part) => part).join(', ');
  }
  editProfile(studentDetails: StudentMasterModel): void {
     this.router.navigate(['/student-registration-form'], { state: { studentDetails, editProfile: 1 } });
  }
}
