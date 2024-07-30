import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { StaffMasterModel } from '../../../../models/staff-master/staff.master.model';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MasterPageComponent } from '../../../../components/master-page/master-page.component';

@Component({
  selector: 'app-staff-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MasterPageComponent],
  templateUrl: './staff-details.component.html',
  styleUrl: './staff-details.component.css',
  providers: [DatePipe],
})
export class StaffDetailsComponent {
  staffDetails!: StaffMasterModel;
  constructor(private datePipe: DatePipe, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.staffDetails = navigation?.extras?.state?.['staffDetails'];
  }

  formatDate_ddMMMyyyy(date?: Date): string {
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
    return addressParts
        .map(part => part ? part.trim() : '') // Ensure trimming and handling undefined
        .filter(part => part.length > 0) // Filter out empty strings
        .join(', ');
  }
}
