import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CommonModule } from '@angular/common';
import {
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { MasterPageComponent } from '../../../../components/master-page/master-page.component';
import { ParentsDetailsModel, StudentMasterModel } from '../../../../models/student-master/student.master.model';
import { StudentMasterService } from '../../../../services/student-master-services/student-master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-parents-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MasterPageComponent],
  templateUrl: './parents-details.component.html',
  styleUrl: './parents-details.component.css',
})
export class ParentsDetailsComponent {
  @ViewChild('parentsSchoolEmailIDInput') parentsSchoolEmailIDInput: ElementRef | undefined;
  studentId!: number;
  studentDetails: StudentMasterModel | undefined;
  ParentsDetailsForm!: FormGroup;
  editProfile: number = 0;

  ngAfterViewInit() {
    this.renderer.selectRootElement(this.parentsSchoolEmailIDInput!.nativeElement).focus();
  }
  // Inject FormBuilder to create the form
  constructor(
    private fb: FormBuilder,
    private studentMasterService: StudentMasterService,
    private router: Router,
    private renderer: Renderer2,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      const from = params['from'];
      if (from === 'registration') {
        console.log('Navigated from Student Registration');
        history.replaceState({ studentDetails: null, editProfile: 0 }, '');
        this.studentDetails = undefined;
        this.editProfile = 0;
        this.ResetForm();
      } else {
        console.log('Navigated from Edit Profile');
        const navigation = this.router.getCurrentNavigation();
        const state = navigation?.extras.state as { studentDetails: StudentMasterModel, editProfile: number };
        if (state) {
          if (state.editProfile === 1) {
            this.studentDetails = state.studentDetails;
            this.editProfile = state.editProfile;
          }
        }
        console.log('Student Details: ', JSON.stringify(this.studentDetails));
      }
    });
    // Create the form using FormBuilder
    this.ParentsDetailsForm = this.fb.group({
      studentID: [this.studentDetails?.studentID || null],
      parentsID: [this.studentDetails?.parentsID || null],
      parentsSchoolEmailID: [this.studentDetails?.parentsSchoolEmailID || '', [Validators.required, Validators.email]],
      fathersName: [this.studentDetails?.fathersName || '', [Validators.required]],
      fathersMobileNo: [this.studentDetails?.fathersMobileNo || null, [Validators.required]],
      fathersPersonalEmailID: [this.studentDetails?.fathersPersonalEmailID || null, [Validators.required, Validators.email]],
      fathersEmploymentStatus: [this.studentDetails?.fathersEmploymentStatus || null],
      fathersEmploymentSector: [this.studentDetails?.fathersEmploymentSector || null],
      fathersSpeciality: [this.studentDetails?.fathersSpeciality || null],
      fathersOccupationProfile: [this.studentDetails?.fathersOccupationProfile || null],
      fathersOrganizationName: [this.studentDetails?.fathersOrganizationName || null],
      fathersCanOfferInternship: [this.studentDetails?.fathersCanOfferInternship || false],
      fathersWorkPlaceFieldTripPermission: [this.studentDetails?.fathersWorkPlaceFieldTripPermission || false],
      fathersWorkPlaceInfo: [this.studentDetails?.fathersWorkPlaceInfo || null],
      mothersName: [this.studentDetails?.mothersName || null, [Validators.required]],
      mothersMobileNo: [this.studentDetails?.mothersMobileNo || null, [Validators.required]],
      mothersPersonalEmailID: [this.studentDetails?.mothersPersonalEmailID || null, [Validators.required, Validators.email]],
      mothersEmploymentStatus: [this.studentDetails?.mothersEmploymentStatus || null],
      mothersEmploymentSector: [this.studentDetails?.mothersEmploymentSector || null],
      mothersSpeciality: [this.studentDetails?.mothersSpeciality || null],
      mothersOccupationProfile: [this.studentDetails?.mothersOccupationProfile || null],
      mothersOrganizationName: [this.studentDetails?.mothersOrganizationName || null],
      mothersCanOfferInternship: [this.studentDetails?.mothersCanOfferInternship || false],
      mothersWorkPlaceFieldTripPermission: [this.studentDetails?.mothersWorkPlaceFieldTripPermission || false],
      mothersWorkPlaceInfo: [this.studentDetails?.mothersWorkPlaceInfo || null],
      guardianName: [this.studentDetails?.guardianName || null],
      guardianNumber: [this.studentDetails?.guardianNumber || null],
      guardianEmailID: [this.studentDetails?.guardianEmailID || null],
      guardianRelationship: [this.studentDetails?.guardianRelationship || null],
    });

    // Subscribe to form value changes and filter out null/undefined values
    this.ParentsDetailsForm.valueChanges
      .pipe(filter((value) => !!value))
      .subscribe((value) => {
        value.parentsID = value.parentsID ? parseInt(value.parentsID) : null;
        value.fathersMobileNo = value.fathersMobileNo
          ? value.fathersMobileNo.toString()
          : '';
        value.mothersMobileNo = value.mothersMobileNo
          ? value.mothersMobileNo.toString()
          : '';

        value.guardianNumber = value.guardianNumber
          ? value.guardianNumber.toString()
          : '';
        this.objParentsDetailsModel = value as ParentsDetailsModel;
      });
  }

  objParentsDetailsModel: ParentsDetailsModel | undefined;

  // Method to submit form
  SaveParentsDetails() {
    this.ParentsDetailsForm.patchValue({
      studentID: sessionStorage.getItem('insertedStudentID')
    });
    if (this.ParentsDetailsForm.valid) {
      console.log('Parents Details:', this.objParentsDetailsModel);

      this.studentMasterService.UpsertParentsDetails(this.objParentsDetailsModel)
        .subscribe(
          (res) => {
            console.log('UpsertParentsDetails Response:');
            console.log(res);
            if (res === null || res === undefined || res === 0) {
              Swal.fire({
                title: 'Error!',
                text: 'Failed to add Parent\'s Details.',
                icon: 'error',
                confirmButtonText: 'Retry'
              });
            } else {
              sessionStorage.setItem('insertedParentsID', Number(res).toString());
              // alert('Student registration - Parent\'s Details added successfully.');
              Swal.fire({
                title: 'Success!',
                text: 'Parent\'s Details added Successfully.',
                icon: 'success',
                confirmButtonText: 'Cool'
              });
              const tabElement = document.querySelector('a[href="#nav-tab-other-details"]');
              if (this.editProfile === 0) {
                if (tabElement) {
                  this.renderer.removeClass(tabElement, 'disabled');
                  this.renderer.setProperty(tabElement, 'aria-selected', 'true');
                  tabElement.dispatchEvent(new Event('click'));
                }
              }
            }
          },
          (error) => {
            console.error('Error:', error);
            Swal.fire({
              title: 'Error!',
              text: `Failed to add Parent\'s Details. Error: ${error.message || error}`,
              icon: 'error',
              confirmButtonText: 'Retry'
            });
          }
        );
    } else {
      console.error('Form is invalid');
    }
    this.ResetForm();
  }

  ResetForm() {
    if (this.ParentsDetailsForm) {
      this.ParentsDetailsForm.reset();
    }
  }

  get ParentsSchoolEmailID(): FormControl {
    return this.ParentsDetailsForm.get('parentsSchoolEmailID') as FormControl;
  }
  get FathersName(): FormControl {
    return this.ParentsDetailsForm.get('fathersName') as FormControl;
  }
  get FathersMobileNo(): FormControl {
    return this.ParentsDetailsForm.get('fathersMobileNo') as FormControl;
  }
  get FathersPersonalEmailID(): FormControl {
    return this.ParentsDetailsForm.get('fathersPersonalEmailID') as FormControl;
  }
  get FathersEmploymentStatus(): FormControl {
    return this.ParentsDetailsForm.get(
      'fathersEmploymentStatus'
    ) as FormControl;
  }
  get FathersEmploymentSector(): FormControl {
    return this.ParentsDetailsForm.get(
      'fathersEmploymentSector'
    ) as FormControl;
  }
  get FathersSpeciality(): FormControl {
    return this.ParentsDetailsForm.get('fathersSpeciality') as FormControl;
  }
  get FathersOccupationProfile(): FormControl {
    return this.ParentsDetailsForm.get(
      'fathersOccupationProfile'
    ) as FormControl;
  }
  get FathersOrganizationName(): FormControl {
    return this.ParentsDetailsForm.get(
      'fathersOrganizationName'
    ) as FormControl;
  }
  get FathersCanOfferInternship(): FormControl {
    return this.ParentsDetailsForm.get(
      'fathersCanOfferInternship'
    ) as FormControl;
  }
  get FathersWorkPlaceFieldTripPermission(): FormControl {
    return this.ParentsDetailsForm.get(
      'fathersWorkPlaceFieldTripPermission'
    ) as FormControl;
  }
  get FathersWorkPlaceInfo(): FormControl {
    return this.ParentsDetailsForm.get('fathersWorkPlaceInfo') as FormControl;
  }
  get MothersName(): FormControl {
    return this.ParentsDetailsForm.get('mothersName') as FormControl;
  }
  get MothersMobileNo(): FormControl {
    return this.ParentsDetailsForm.get('mothersMobileNo') as FormControl;
  }
  get MothersPersonalEmailID(): FormControl {
    return this.ParentsDetailsForm.get('mothersPersonalEmailID') as FormControl;
  }
  get MothersEmploymentStatus(): FormControl {
    return this.ParentsDetailsForm.get(
      'mothersEmploymentStatus'
    ) as FormControl;
  }
  get MothersEmploymentSector(): FormControl {
    return this.ParentsDetailsForm.get(
      'mothersEmploymentSector'
    ) as FormControl;
  }
  get MothersSpeciality(): FormControl {
    return this.ParentsDetailsForm.get('mothersSpeciality') as FormControl;
  }
  get MothersOccupationProfile(): FormControl {
    return this.ParentsDetailsForm.get(
      'mothersOccupationProfile'
    ) as FormControl;
  }
  get MothersOrganizationName(): FormControl {
    return this.ParentsDetailsForm.get(
      'mothersOrganizationName'
    ) as FormControl;
  }
  // Getters for additional fields
  get MothersCanOfferInternship(): FormControl {
    return this.ParentsDetailsForm.get(
      'mothersCanOfferInternship'
    ) as FormControl;
  }
  get MothersFieldTripPermission(): FormControl {
    return this.ParentsDetailsForm.get(
      'mothersFieldTripPermission'
    ) as FormControl;
  }
  get MothersWorkPlaceInfo(): FormControl {
    return this.ParentsDetailsForm.get('mothersWorkPlaceInfo') as FormControl;
  }
  // Getters for guardian fields
  get GuardianName(): FormControl {
    return this.ParentsDetailsForm.get('guardianName') as FormControl;
  }
  get GuardianNumber(): FormControl {
    return this.ParentsDetailsForm.get('guardianNumber') as FormControl;
  }
  get GuardianEmailID(): FormControl {
    return this.ParentsDetailsForm.get('guardianEmailID') as FormControl;
  }
  get GuardianRelationship(): FormControl {
    return this.ParentsDetailsForm.get('guardianRelationship') as FormControl;
  }
}
