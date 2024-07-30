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
import { OrganizationTeamModel } from '../../../../models/school-master/organizational-master/organization-team.model';
import { SchoolMasterService } from '../../../../services/school-master-services/school-master.service';
import { SharedService } from '../../../../services/shared.service';

@Component({
  selector: 'app-organization-team',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MasterPageComponent],
  templateUrl: './organization-team.component.html',
  styleUrl: './organization-team.component.css',
  providers: [DatePipe],
})
export class OrganizationTeamComponent {
  private reloadSubscription!: Subscription;
  allOrganizationGroup: any;
  allOrganizationDepartment: any;
  allOrganizationTeam: any;
  buttonLabel: string = 'Save';
  editedOrganizationTeamID: number = 0;
  selectedOrganizationTeamID: number = 0;

  constructor(
    private schoolMaster: SchoolMasterService,
    private sharedService: SharedService,
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.reloadSubscription = this.sharedService
      .getReloadObservable()
      .subscribe(() => {
        this.GetAllOrganizationDepartment();
        this.GetAllOrganizationTeam();
        this.sort('teamName');
      });
  }

  OrganizationTeamForm = new FormGroup({
    organizationDepartmentName: new FormControl('', [Validators.required]),
    organizationTeamName: new FormControl('', [Validators.required]),
  });

  GetAllOrganizationDepartment() {
    this.schoolMaster.GetAllOrganizationDepartment().subscribe(
      (data) => {
        console.log('GetAllOrganizationDepartment Response: ');
        console.log(data);
        this.allOrganizationDepartment = data;
        this.OrganizationTeamForm.patchValue({
          organizationDepartmentName: '0',
        });
      },
      (error) => {
        console.error('Error:', error);
        console.log('Error :' + error);
      }
    );
  }
  GetAllOrganizationTeam() {
    this.schoolMaster.GetAllOrganizationTeam().subscribe(
      (data) => {
        console.log('GetAllOrganizationTeam Response:');
        console.log(data);
        this.allOrganizationTeam = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  UpsertOrganizationTeam() {
    console.log('this.editedOrganizationTeamID');
    console.log(this.editedOrganizationTeamID);
    let objOrganizationTeam: OrganizationTeamModel;
    objOrganizationTeam = {
      organizationTeamID: this.editedOrganizationTeamID,
      organizationGroupID: 0,
      groupName: '',
      organizationDepartmentID: this.OrganizationDepartmentName.value ?? '',
      departmentName: '',
      teamName: this.OrganizationTeamName.value ?? '',
      isDeleted: false,
      createdDateTime: new Date(),
      createdBy: '',
      updatedDateTime: new Date(),
      updatedBy: '',
    };
    this.schoolMaster.UpsertOrganizationTeam(objOrganizationTeam).subscribe(
      (res) => {
        console.log('UpsertOrganizationTeam Response:');
        console.log(res);
        if (res === null || res === undefined) {
          alert('Something went wrong.');
        } else {
          if (this.editedOrganizationTeamID === 0) {
            alert('Organization Team added successfully.');
          } else {
            alert('Organization Team updated successfully.');
            this.editedOrganizationTeamID = 0;
          }
          this.GetAllOrganizationTeam();
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    this.OrganizationTeamForm.reset();
    this.buttonLabel = 'Save';
  }
  EditOrganizationTeam(organizationTeam: any) {
    this.selectedOrganizationTeamID = organizationTeam.organizationTeamID;
    this.OrganizationTeamForm.patchValue({
      organizationDepartmentName: organizationTeam.organizationDepartmentID,
      organizationTeamName: organizationTeam.teamName,
    });
    this.buttonLabel = 'Update';
    this.editedOrganizationTeamID = organizationTeam.organizationTeamID;
  }
  RemoveOrganizationTeam(organizationTeamID: number) {
    if (!confirm('Are you sure you want to remove?')) {
      return;
    }
    this.schoolMaster
      .DeleteOrganizationTeam(organizationTeamID,'')
      .subscribe(
        (res) => {
          console.log('DeleteOrganizationTeam Response:');
          console.log(res);
          if (res === null || res === undefined) {
            alert('Something went wrong.');
          } else {
            this.GetAllOrganizationTeam();
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }
  ResetForm() {
    this.OrganizationTeamForm.reset();
    this.selectedOrganizationTeamID = 0;
    this.buttonLabel = 'Save';
    this.editedOrganizationTeamID = 0;
  }
  HighlightSelectedRow(selectedOrganizationTeamID: number) {
    this.selectedOrganizationTeamID = selectedOrganizationTeamID;
  }
  
  
  sortDirection: number = 1;
  sort(key: keyof OrganizationTeamModel) {
    if (this.allOrganizationTeam) {
      this.sortDirection = this.sortDirection === 1 ? -1 : 1;
      this.allOrganizationTeam = this.allOrganizationTeam.sort(
        (a: OrganizationTeamModel, b: OrganizationTeamModel) => {
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
  get OrganizationDepartmentName(): FormControl {
    return this.OrganizationTeamForm.get(
      'organizationDepartmentName'
    ) as FormControl;
  }
  get OrganizationTeamName(): FormControl {
    return this.OrganizationTeamForm.get('organizationTeamName') as FormControl;
  }
}
