import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MasterPageComponent } from '../../../../components/master-page/master-page.component';
import { StudentMasterModel, StudentOtherDetailsModel } from '../../../../models/student-master/student.master.model';
import { StudentMasterService } from '../../../../services/student-master-services/student-master.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-other-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MasterPageComponent],
  templateUrl: './other-details.component.html',
  styleUrl: './other-details.component.css',
})
export class OtherDetailsComponent {
  StudentOtherDetailsForm: FormGroup;
  studentDetails: StudentMasterModel | undefined;
  editProfile: number = 0;
  selectedFile: File | null = null;

  formatDate = (date: Date | string | undefined): string | null => {
    if (!date) {
      return null;
    }
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${d.getFullYear()}-${month}-${day}`;
  };

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
    this.StudentOtherDetailsForm = this.fb.group({
      studentID: [this.studentDetails?.studentID || null],
      studentOtherDetailsID: [this.studentDetails?.studentOtherDetailsID || null],
      isSpecialNeedChild: [this.studentDetails?.isSpecialNeedChild || false],
      isHandicape: [this.studentDetails?.isHandicape || false],
      motherTongue: [this.studentDetails?.motherTongue || ''],
      foodPreference: [this.studentDetails?.foodPreference || ''],
      foodRestriction: [this.studentDetails?.foodRestriction || ''],
      admissionNumber: [this.studentDetails?.admissionNumber || ''],
      admissionInquiryNumber: [this.studentDetails?.admissionInquiryNumber || ''],
      admissionGrantedDate: [this.formatDate(this.studentDetails?.admissionGrantedDate) || ''],
      dateOfJoin: [this.formatDate(this.studentDetails?.dateOfJoin) || ''],
      familyPhotoPath: [this.studentDetails?.familyPhotoPath || ''],
    });


    // Subscribe to form value changes and filter out null/undefined values
    this.StudentOtherDetailsForm.valueChanges
      .pipe(filter((value) => !!value))
      .subscribe((value) => {
        value.admissionGrantedDate = value.admissionGrantedDate !== "" ? this.formatDate(value.admissionGrantedDate) : null;
        value.dateOfJoin = value.dateOfJoin !== "" ? this.formatDate(value.dateOfJoin) : null;
        this.objStudentOtherDetailsModel = value as StudentOtherDetailsModel;
      });
  }
  objStudentOtherDetailsModel: StudentOtherDetailsModel | undefined;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile, this.selectedFile.name);
        this.studentMasterService.UploadStudentFamilyPhoto(formData).subscribe(
          (res: { filePath: string }) => {
            this.StudentOtherDetailsForm.patchValue({
              familyPhotoPath: res.filePath
            });
          })
      }
    }
  }

  // Method to submit form
  SaveStudentOtherDetails() {
    if (this.studentDetails) {
      this.StudentOtherDetailsForm.patchValue({
        studentID: this.studentDetails.studentID
      });
    } else {
      this.StudentOtherDetailsForm.patchValue({
        studentID: sessionStorage.getItem('insertedStudentID')
      });
    }
    if (this.StudentOtherDetailsForm.valid) {
      console.log('Student Other Details:', this.objStudentOtherDetailsModel);

      this.studentMasterService.UpsertStudentOtherDetails(this.objStudentOtherDetailsModel)
        .subscribe(
          (res) => {
            console.log('UpsertStudentOtherDetails Response:');
            console.log(res);
            if (res === null || res === undefined) {
              alert('Something went wrong.');
              Swal.fire({
                title: 'Error!',
                text: 'Failed to add Student Other Details.',
                icon: 'error',
                confirmButtonText: 'Retry'
              });
            } else {
              // sessionStorage.setItem('insertedStudentOtherDetailsID', Number(res).toString());
              // alert('Student registration - Other Details added successfully.');
              Swal.fire({
                title: 'Success!',
                text: 'Student Other Details added Successfully.',
                icon: 'success',
                confirmButtonText: 'Cool'
              });
              const tabElement = document.querySelector('a[href="#nav-tab-personal-details"]');
              if (tabElement) {
                this.renderer.setProperty(tabElement, 'aria-selected', 'true');
                tabElement.dispatchEvent(new Event('click'));
              }
              if (this.editProfile = 0) {
                const parentsTabElement = document.querySelector('a[href="#nav-tab-parents-details"]');
                if (parentsTabElement) {
                  this.renderer.addClass(parentsTabElement, 'disabled');
                }
                const studentOtherTabElement = document.querySelector('a[href="#nav-tab-other-details"]');
                if (studentOtherTabElement) {
                  this.renderer.addClass(studentOtherTabElement, 'disabled');
                }
              }
            }
          },
          (error) => {
            console.error('Error:', error);
            Swal.fire({
              title: 'Error!',
              text: `Failed to add Student Other Details. Error: ${error.message || error}`,
              icon: 'error',
              confirmButtonText: 'Retry'
            });
          }
        );
    } else {
      console.error('Form is invalid');
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add Student Other Details.',
        icon: 'error',
        confirmButtonText: 'Retry'
      });
    }
    this.ResetForm();
  }
  ResetForm() {
    if (this.StudentOtherDetailsForm) {
      this.StudentOtherDetailsForm.reset();
    }
  }

  // Getter methods
  get IsSpecialNeedChild(): FormControl {
    return this.StudentOtherDetailsForm.get(
      'isSpecialNeedChild'
    ) as FormControl;
  }

  get IsHandicape(): FormControl {
    return this.StudentOtherDetailsForm.get('isHandicape') as FormControl;
  }

  get MotherTongue(): FormControl {
    return this.StudentOtherDetailsForm.get('motherTongue') as FormControl;
  }

  get FoodPreference(): FormControl {
    return this.StudentOtherDetailsForm.get('foodPreference') as FormControl;
  }

  get FoodRestriction(): FormControl {
    return this.StudentOtherDetailsForm.get('foodRestriction') as FormControl;
  }

  get AdmissionNumber(): FormControl {
    return this.StudentOtherDetailsForm.get('admissionNumber') as FormControl;
  }

  get AdmissionInquiryNumber(): FormControl {
    return this.StudentOtherDetailsForm.get(
      'admissionInquiryNumber'
    ) as FormControl;
  }

  get AdmissionGrantedDate(): FormControl {
    return this.StudentOtherDetailsForm.get(
      'admissionGrantedDate'
    ) as FormControl;
  }

  get DateOfJoin(): FormControl {
    return this.StudentOtherDetailsForm.get('dateOfJoin') as FormControl;
  }
  get FamilyphotoPath(): FormControl {
    return this.StudentOtherDetailsForm.get('familyPhotoPath') as FormControl;
  }
}
