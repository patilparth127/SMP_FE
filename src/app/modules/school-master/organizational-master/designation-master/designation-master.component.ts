import { Component } from '@angular/core';
import { SchoolMasterService } from '../../../../services/school-master-services/school-master.service';
import { CommonModule, DatePipe } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MasterPageComponent } from '../../../../components/master-page/master-page.component';
import { StaffDesignationMasterModel } from '../../../../models/school-master/organizational-master/staff-designation-master.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { SharedService } from '../../../../services/shared.service';
@Component({
  selector: 'app-designation-master',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MasterPageComponent],
  templateUrl: './designation-master.component.html',
  styleUrl: './designation-master.component.css',
  providers: [DatePipe],
})
export class DesignationMasterComponent {
  private reloadSubscription!: Subscription;
  allStaffDesignationMaster: any;
  buttonLabel: string = 'Save';
  editedStaffDesignationMasterID: number = 0;
  selectedStaffDesignationMasterID: number = 0;

  constructor(
    private schoolMaster: SchoolMasterService,
    private datePipe: DatePipe,
    private sharedService: SharedService
  ) { }
  ngOnInit(): void {

    this.reloadSubscription = this.sharedService
      .getReloadObservable()
      .subscribe(() => {
        this.GetAllStaffDesignationMaster();
        this.sort('designationName');
      });
  }

  StaffDesignationMasterForm = new FormGroup({
    staffDesignationName: new FormControl('', [Validators.required]),
    staffDesignationDescription: new FormControl('', [Validators.required]),
  });


  GetAllStaffDesignationMaster() {
    this.schoolMaster.GetAllStaffDesignationMaster().subscribe(
      (data) => {
        console.log('GetAllStaffDesignationMaster Response:');
        console.log(data);
        this.allStaffDesignationMaster = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  UpsertStaffDesignationMaster() {
    console.log('this.editedStaffDesignationMasterID');
    console.log(this.editedStaffDesignationMasterID);

    let objStaffDesignationMaster: StaffDesignationMasterModel;
    objStaffDesignationMaster = {
      staffDesignationMasterID: this.editedStaffDesignationMasterID,
      designationName: this.StaffDesignationName.value ?? '',
      description: this.StaffDesignationDescription.value ?? '',
      isDeleted: false,
      createdDateTime: new Date(),
      createdBy: '',
      updatedDateTime: new Date(),
      updatedBy: '',
    }

    this.schoolMaster.UpsertStaffDesignationMaster(objStaffDesignationMaster).subscribe(
      (res) => {
        console.log('UpsertStaffDesignationMaster Response:');
        console.log(res);
        if (res === null || res === undefined) {
          alert('Something went wrong.');
        } else {
          if (this.editedStaffDesignationMasterID === 0) {
            alert('Staff Designation added successfully.');
          } else {
            alert('Staff Designation updated successfully.');
            this.editedStaffDesignationMasterID = 0;
          }
          this.GetAllStaffDesignationMaster();
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    this.StaffDesignationMasterForm.reset();
    this.buttonLabel = 'Save';
  }
  EditStaffDesignationMaster(objStaffDesignationMaster: any) {
    this.selectedStaffDesignationMasterID = objStaffDesignationMaster.staffDesignationMasterID;
    this.StaffDesignationMasterForm.patchValue({
      staffDesignationName: objStaffDesignationMaster.designationName,
      staffDesignationDescription: objStaffDesignationMaster.description
    });
    this.buttonLabel = 'Update';
    this.editedStaffDesignationMasterID = objStaffDesignationMaster.staffDesignationMasterID;
  }
  RemoveStaffDesignationMaster(staffDesignationMasterID: number) {
    if (!confirm('Are you sure you want to remove?')) {
      return;
    }
    this.schoolMaster
      .DeleteStaffDesignationMaster(staffDesignationMasterID, '')
      .subscribe(
        (res) => {
          console.log('DeleteStaffDesignationMaster Response:');
          console.log(res);
          if (res === null || res === undefined) {
            alert('Something went wrong.');
          } else {
            this.GetAllStaffDesignationMaster();
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }
  ResetForm() {
    this.StaffDesignationMasterForm.reset();
    this.selectedStaffDesignationMasterID = 0;
    this.buttonLabel = 'Save';
    this.editedStaffDesignationMasterID = 0;
  }
  HighlightSelectedRow(selectedStaffDesignationMasterID: number) {
    this.selectedStaffDesignationMasterID = selectedStaffDesignationMasterID;
  }
  sortDirection: number = 1;
  sort(key: keyof StaffDesignationMasterModel) {
    if (this.allStaffDesignationMaster) {
      this.sortDirection = this.sortDirection === 1 ? -1 : 1;
      this.allStaffDesignationMaster = this.allStaffDesignationMaster.sort(
        (a: StaffDesignationMasterModel, b: StaffDesignationMasterModel) => {
          const valueA = a[key];
          const valueB = b[key];

          if (typeof valueA === 'string' && typeof valueB === 'string') {
            return valueA.localeCompare(valueB) * this.sortDirection;
          }

          // Assuming the values are numbers
          return ((valueA as any) - (valueB as any)) * this.sortDirection;
        }
      );
    }
  }

  get StaffDesignationName(): FormControl {
    return this.StaffDesignationMasterForm.get('staffDesignationName') as FormControl;
  }
  get StaffDesignationDescription(): FormControl {
    return this.StaffDesignationMasterForm.get('staffDesignationDescription') as FormControl;
  }
}
