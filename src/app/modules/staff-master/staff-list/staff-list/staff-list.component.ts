import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MasterPageComponent } from '../../../../components/master-page/master-page.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StaffMasterModel } from '../../../../models/staff-master/staff.master.model';
import { StaffMasterService } from '../../../../services/staff-master-services/staff-master.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-list',
  standalone: true,
  templateUrl: './staff-list.component.html',
  styleUrl: './staff-list.component.css',
  providers: [DatePipe],
  imports: [CommonModule, ReactiveFormsModule, MasterPageComponent],
})
export class StaffListComponent {
  freeTextSearch: FormControl | undefined;
  lstStaffDetails!: StaffMasterModel[];
  formGroup!: FormGroup;

  ngOnInit() {
    this.formGroup = new FormGroup({
      freeTextSearch: new FormControl('')
    });
    this.formGroup.get('freeTextSearch')!.valueChanges.subscribe(value => {
      console.log('User input:', value);
      this.GetAllStaffDetails(value);
    });
    this.freeTextSearch = new FormControl('');
    this.freeTextSearch.valueChanges.subscribe(value => {
      console.log('User input:', value);
      this.GetAllStaffDetails(value);
    });
  }
  constructor(
    private datePipe: DatePipe,
    private staffMasterService: StaffMasterService,
    private router: Router
  ) {
    this.GetAllStaffDetails();
  }
  GetAllStaffDetails(freeText?: string): void {
    this.staffMasterService.GetAllStaffDetails(freeText).subscribe(
      (data) => {
        console.log('GetAllStaffDetails Response:', data);
        this.lstStaffDetails = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  seeDetails(staffDetails: StaffMasterModel): void {
    this.router.navigate(['/staff-details'], { state: { staffDetails } });
  }
}
