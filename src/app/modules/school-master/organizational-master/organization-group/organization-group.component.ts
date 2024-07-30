import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { MasterPageComponent } from '../../../../components/master-page/master-page.component';
import { OrganizationGroupModel } from '../../../../models/school-master/organizational-master/organization-group.model';
import { SchoolMasterService } from '../../../../services/school-master-services/school-master.service';
import { SharedService } from '../../../../services/shared.service';

@Component({
  selector: 'app-organization-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MasterPageComponent],
  templateUrl: './organization-group.component.html',
  styleUrl: './organization-group.component.css',
  providers: [DatePipe],
})
export class OrganizationGroupComponent {
  private reloadSubscription!: Subscription;
  allOrganizationGroup: any;
  buttonLabel: string = 'Save';
  editedOrganizationGroupID: number = 0;
  selectedOrganizationGroupID: number = 0;
  
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
        this.sort('groupDescription');
      });
  }

  OrganizationGroupForm = new FormGroup({
    organizationGroupName: new FormControl('', [Validators.required]),
    organizationGroupDescription: new FormControl('', [Validators.required]),
  });

  GetAllOrganizationGroup() {
    this.schoolMaster.GetAllOrganizationGroup().subscribe(
      (data) => {
        console.log('GetAllOrganizationGroup Response: ');
        console.log(data);
        this.allOrganizationGroup = data;
      },
      (error) => {
        console.error('Error:', error);
        console.log('Error :' + error);
      }
    );
  }

  UpsertOrganizationGroup() {
    console.log('this.editedOrganizationGroupID');
    console.log(this.editedOrganizationGroupID);
    let objOrganizationGroup: OrganizationGroupModel;
    objOrganizationGroup = {
      organizationGroupID: this.editedOrganizationGroupID,
      groupName: this.OrganizationGroupName.value ?? '',
      groupDescription: this.OrganizationGroupDescription.value ?? '',
      isDeleted: false,
      createdDateTime: new Date(),
      createdBy: '',
      updatedDateTime: new Date(),
      updatedBy: '',
    };
    this.schoolMaster.UpsertOrganizationGroup(objOrganizationGroup).subscribe(
      (res) => {
        console.log('UpsertOrganizationGroup Response:');
        console.log(res);
        if (res === null || res === undefined) {
          alert('Something went wrong.');
        } else {
          if (this.editedOrganizationGroupID === 0) {
            alert('Organization Group added successfully.');
          } else {
            alert('Organization Group updated successfully.');
            this.editedOrganizationGroupID = 0;
          }
          this.GetAllOrganizationGroup();
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    this.OrganizationGroupForm.reset();
    this.buttonLabel = 'Save';
  }

  EditOrganizationGroup(objOrganizationGroup: any) {
    this.selectedOrganizationGroupID = objOrganizationGroup.organizationGroupID;
    this.OrganizationGroupForm.patchValue({
      organizationGroupName: objOrganizationGroup.groupName,
      organizationGroupDescription: objOrganizationGroup.groupDescription,
    });
    this.buttonLabel = 'Update';
    this.editedOrganizationGroupID = objOrganizationGroup.organizationGroupID;
  }
  RemoveOrganizationGroup(organizationGroupID: number) {
    if (!confirm('Are you sure you want to remove?')) {
      return;
    }
    this.schoolMaster.DeleteOrganizationGroup(organizationGroupID).subscribe(
      (res) => {
        console.log('DeleteOrganizationGroup Response:');
        console.log(res);
        if (res === null || res === undefined) {
          alert('Something went wrong.');
        } else {
          this.GetAllOrganizationGroup();
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  ResetForm() {
    this.OrganizationGroupForm.reset();
    this.selectedOrganizationGroupID = 0;
    this.buttonLabel = 'Save';
    this.editedOrganizationGroupID = 0;
  }
  HighlightSelectedRow(selectedOrganizationGroupID: number) {
    this.selectedOrganizationGroupID = selectedOrganizationGroupID;
  }
  sortDirection: number = 1;
  sort(key: keyof OrganizationGroupModel) {
    if (this.allOrganizationGroup) {
      this.sortDirection = this.sortDirection === 1 ? -1 : 1;
      this.allOrganizationGroup = this.allOrganizationGroup.sort(
        (a: OrganizationGroupModel, b: OrganizationGroupModel) => {
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

  get OrganizationGroupName(): FormControl {
    return this.OrganizationGroupForm.get(
      'organizationGroupName'
    ) as FormControl;
  }
  get OrganizationGroupDescription(): FormControl {
    return this.OrganizationGroupForm.get(
      'organizationGroupDescription'
    ) as FormControl;
  }
}
