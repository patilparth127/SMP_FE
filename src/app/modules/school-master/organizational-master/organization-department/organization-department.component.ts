import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { MasterPageComponent } from '../../../../components/master-page/master-page.component';
import { OrganizationDepartmentModel } from '../../../../models/school-master/organizational-master/organization-department.model';
import { SchoolMasterService } from '../../../../services/school-master-services/school-master.service';
import { SharedService } from '../../../../services/shared.service';

@Component({
  selector: 'app-organization-department',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MasterPageComponent],
  templateUrl: './organization-department.component.html',
  styleUrl: './organization-department.component.css',
  providers: [DatePipe],
})
export class OrganizationDepartmentComponent {
  private reloadSubscription!: Subscription;
  allOrganizationDepartment: any;
  allOrganizationGroup: any;
  isOrganizationGroupNameEmpty: boolean | undefined;
  buttonLabel: string = 'Save';
  editedOrganizationDepartmentID: number = 0;
  selectedOrganizationDepartmentID: number = 0;

  constructor(
    private schoolMaster: SchoolMasterService,
    private datePipe: DatePipe,
    private sharedService: SharedService
  ) { }
  ngOnInit(): void {
    this.reloadSubscription = this.sharedService
      .getReloadObservable()
      .subscribe(() => {
        this.GetAllOrganizationGroup();
        this.GetAllOrganizationDepartment();
        this.sort('departmentName');
      });

  }


  OrganizationDepartmentForm = new FormGroup({
    organizationGroupName: new FormControl('', [Validators.required]),
    organizationDepartmentName: new FormControl('', [Validators.required]),
  });

  GetAllOrganizationGroup() {
    this.schoolMaster.GetAllOrganizationGroup().subscribe(
      (data) => {
        console.log('GetAllOrganizationGroup Response: ');
        console.log(data);
        this.allOrganizationGroup = data;
        this.OrganizationDepartmentForm.patchValue({
          organizationGroupName: '0',
        });
      },
      (error) => {
        console.error('Error:', error);
        console.log('Error :' + error);
      }
    );
  }

  GetAllOrganizationDepartment() {
    this.schoolMaster.GetAllOrganizationDepartment().subscribe({
      next: (data) => {
        console.log('GetAllOrganizationDepartment Response:');
        console.log(data);
        this.allOrganizationDepartment = data;


      },
      error: (error) => {
        console.error('Error:', error);
      }
    })
  }

  UpsertOrganizationDepartment() {
    console.log('this.editedOrganizationDepartmentID');
    console.log(this.editedOrganizationDepartmentID);
    let objOrganizationDepartment: OrganizationDepartmentModel;
    objOrganizationDepartment = {
      organizationDepartmentID: this.editedOrganizationDepartmentID,
      organizationGroupID: this.OrganizationGroupName.value ?? '',
      groupName: '',
      departmentName: this.OrganizationDepartmentName.value ?? '',
      isDeleted: false,
      createdBy: 0,
      updatedBy: null,
    };

    this.schoolMaster
      .UpsertOrganizationDepartment(objOrganizationDepartment)
      .subscribe(
        (res) => {
          console.log('UpsertOrganizationDepartment Response:');
          console.log(res);
          if (res === null || res === undefined) {
            alert('Something went wrong.');
          } else {
            if (this.editedOrganizationDepartmentID === 0) {
              alert('Department added successfully.');
            } else {
              alert('Department updated successfully.');
              this.editedOrganizationDepartmentID = 0;
            }
            this.GetAllOrganizationDepartment();
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    this.OrganizationDepartmentForm.reset();
    this.buttonLabel = 'Save';
  }
  EditOrganizationDepartment(organizationDepartment: any) {
    this.selectedOrganizationDepartmentID =
      organizationDepartment.organizationDepartmentID;
    this.OrganizationDepartmentForm.patchValue({
      organizationGroupName: organizationDepartment.organizationGroupID,
      organizationDepartmentName: organizationDepartment.departmentName,
    });
    this.buttonLabel = 'Update';
    this.editedOrganizationDepartmentID =
      organizationDepartment.organizationDepartmentID;
  }
  RemoveOrganizationDepartment(organizationDepartmentID: number) {
    if (!confirm('Are you sure you want to remove?')) {
      return;
    }
    this.schoolMaster
      .DeleteOrganizationDepartment(organizationDepartmentID)
      .subscribe(
        (res) => {
          console.log('DeleteOrganizationDepartment Response:');
          console.log(res);
          if (res === null || res === undefined) {
            alert('Something went wrong.');
          } else {
            this.GetAllOrganizationDepartment();
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }
  ResetForm() {
    this.OrganizationDepartmentForm.reset();
    this.selectedOrganizationDepartmentID = 0;
    this.buttonLabel = 'Save';
    this.editedOrganizationDepartmentID = 0;
  }
  HighlightSelectedRow(selectedOrganizationDepartmentID: number) {
    this.selectedOrganizationDepartmentID = selectedOrganizationDepartmentID;
  }

  sortDirection: number = 1;
  sort(key: keyof OrganizationDepartmentModel) {
    if (this.allOrganizationDepartment) {
      this.sortDirection = this.sortDirection === 1 ? -1 : 1;
      this.allOrganizationDepartment = this.allOrganizationDepartment.sort(
        (a: OrganizationDepartmentModel, b: OrganizationDepartmentModel) => {
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

  organizationGroupNameInput() {
    this.isOrganizationGroupNameEmpty = false;
  }

  get OrganizationGroupName(): FormControl {
    return this.OrganizationDepartmentForm.get(
      'organizationGroupName'
    ) as FormControl;
  }
  get OrganizationDepartmentName(): FormControl {
    return this.OrganizationDepartmentForm.get(
      'organizationDepartmentName'
    ) as FormControl;
  }
}
