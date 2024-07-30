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
import { StudentBasicDetailsModel, StudentIDResponse, StudentMasterModel } from '../../../../models/student-master/student.master.model';
import { StudentMasterService } from '../../../../services/student-master-services/student-master.service';
import { OtherDetailsComponent } from "../other-details/other-details.component";
import { ParentsDetailsComponent } from "../parents-details/parents-details.component";
import { StudentRegistrationFormComponent } from "../student-registration-form/student-registration-form.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-personal-details',
  standalone: true,
  templateUrl: './student-personal-details.component.html',
  styleUrl: './student-personal-details.component.css',
  imports: [CommonModule, ReactiveFormsModule, MasterPageComponent, StudentRegistrationFormComponent, ParentsDetailsComponent, OtherDetailsComponent]
})
export class StudentPersonalDetailsComponent {
  // Inject FormBuilder to create the form  
  objStudentBasicDetails: StudentBasicDetailsModel | undefined;
  StudentPersonalDetailsForm: FormGroup;
  studentDetails!: StudentMasterModel;
  selectedFile: File | null = null;
  editProfile: number = 0;

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
        history.replaceState({ studentDetails: null, editProfile: 0 }, '');
        this.studentDetails = null as any;
        this.editProfile = 0;
        this.ResetForm();
        console.log('Navigated from Student Registration');
        const tabElement = document.querySelector('a[href="#nav-tab-personal-details"]');
        if (tabElement) {
          this.renderer.setProperty(tabElement, 'aria-selected', 'true');
          tabElement.dispatchEvent(new Event('click'));
        }
        const parentsTabElement = document.querySelector('a[href="#nav-tab-parents-details"]');
        if (parentsTabElement) {
          this.renderer.addClass(parentsTabElement, 'disabled');
        }
        const studentOtherTabElement = document.querySelector('a[href="#nav-tab-other-details"]');
        if (studentOtherTabElement) {
          this.renderer.addClass(studentOtherTabElement, 'disabled');
        }
      } else {
        const parentsTabElement = document.querySelector('a[href="#nav-tab-parents-details"]');
        if (parentsTabElement) {
          this.renderer.removeClass(parentsTabElement, 'disabled');
        }
        const studentOtherTabElement = document.querySelector('a[href="#nav-tab-other-details"]');
        if (studentOtherTabElement) {
          this.renderer.removeClass(studentOtherTabElement, 'disabled');
        }
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
    const genderValue = this.studentDetails?.gender ? 'Male' : 'Female';
    this.StudentPersonalDetailsForm = this.fb.group({
      studentID: [this.studentDetails?.studentID || null],
      parentsID: [this.studentDetails?.parentsID || null],
      studentOtherDetailsID: [this.studentDetails?.studentOtherDetailsID || null],
      rollNo: [this.studentDetails?.rollNo || ''],
      firstName: [this.studentDetails?.firstName || '', [Validators.required]],
      lastName: [this.studentDetails?.lastName || '', [Validators.required]],
      gender: [genderValue, [Validators.required]],
      birthDate: [this.formatDate(this.studentDetails?.birthDate) || '', [Validators.required]],
      studentSchoolEmailID: [this.studentDetails?.studentSchoolEmailID || '', [Validators.required, Validators.email]],
      bloodGroup: [this.studentDetails?.bloodGroup || ''],
      emergencyContactNo: [this.studentDetails?.emergencyContactNo || '', [Validators.required]],
      whatsappNumber: [this.studentDetails?.whatsappNumber || '', [Validators.required]],
      houseNo: [this.studentDetails?.houseNo || '', [Validators.required]],
      societyName: [this.studentDetails?.societyName || '', [Validators.required]],
      landmark: [this.studentDetails?.landmark || ''],
      area: [this.studentDetails?.area || ''],
      city: [this.studentDetails?.city || 'Ahmedabad', [Validators.required]],
      zip: [this.studentDetails?.zip || '', [Validators.required]],
      state: [this.studentDetails?.state || 'Gujarat', [Validators.required]],
      country: [this.studentDetails?.country || 'India', [Validators.required]],
      house: [this.studentDetails?.house || ''],
      imagePath: [this.studentDetails?.imagePath || ''],
      aadharCardNo: [this.studentDetails?.aadharCardNo || ''],
      nationality: [this.studentDetails?.nationality || 'Indian', [Validators.required]],
      religion: [this.studentDetails?.religion || 'Hinduism', [Validators.required]],
      caste: [this.studentDetails?.caste || ''],
      subCaste: [this.studentDetails?.subCaste || ''],
      resignationDate: [this.studentDetails?.resignationDate || null],
      UDISENumber: [this.studentDetails?.UDISENumber || ''],
      PENNumber: [this.studentDetails?.PENNumber || ''],
      createdBy: ['0'],
    });


    // Subscribe to form value changes and filter out null/undefined values
    this.StudentPersonalDetailsForm.valueChanges
      .pipe(filter((value) => !!value))
      .subscribe((value) => {
        value.gender = value.gender === 'Male'; // Assuming 'Male' represents true and 'Female' represents false

        // Convert fields to string
        value.aadharCardNo = value.aadharCardNo ? value.aadharCardNo.toString() : value.aadharCardNo;
        value.emergencyContactNo = value.emergencyContactNo ? value.emergencyContactNo.toString() : value.emergencyContactNo;
        value.whatsappNumber = value.whatsappNumber ? value.whatsappNumber.toString() : value.whatsappNumber;
        value.zip = value.zip ? value.zip.toString() : value.zip;
        value.UDISENumber = value.UDISENumber ? value.UDISENumber.toString() : value.UDISENumber;
        value.PENNumber = value.PENNumber ? value.PENNumber.toString() : value.PENNumber;

        // Convert fields to integer
        value.studentID = parseInt(value.studentID);
        value.parentsID = parseInt(value.parentsID);
        value.studentOtherDetailsID = parseInt(value.studentOtherDetailsID);
        value.resignationDate = value.resignationDate !== "" ? this.formatDate(value.resignationDate) : null;

        this.objStudentBasicDetails = value as StudentBasicDetailsModel;
      });
  }
  ngOnInit(): void {
    if (this.editProfile = 0) {
      const parentsTabElement = document.querySelector('a[href="#nav-tab-parents-details"]');
      const studentOtherTabElement = document.querySelector('a[href="#nav-tab-other-details"]');
      if (parentsTabElement) {
        this.renderer.addClass(parentsTabElement, 'disabled');
      }
      if (studentOtherTabElement) {
        this.renderer.addClass(studentOtherTabElement, 'disabled');
      }
    }
  }

  formatDate = (date: Date | string | undefined): string | null => {
    if (!date) {
      return null;
    }
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${d.getFullYear()}-${month}-${day}`;
  };

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile, this.selectedFile.name);
        this.studentMasterService.UploadStudentProfileImage(formData).subscribe(
          (res: { filePath: string }) => {
            this.StudentPersonalDetailsForm.patchValue({
              imagePath: res.filePath
            });
          })
      }
    }
  }

  // Method to submit form
  SaveStudentPersonalDetails() {
    if (this.StudentPersonalDetailsForm.valid) {
      console.log('Student Details:', this.objStudentBasicDetails);
    } else {
      console.error('Form is invalid');
    }

    if (this.selectedFile) {
      this.studentMasterService.UpsertStudentBasicDetails(this.objStudentBasicDetails)
        .subscribe(
          (res: StudentIDResponse) => {
            console.log('InsertStudentPersonalDetails Response:');
            console.log(res);
            if (res === null || res === undefined) {
              this.showAlert('Error!', `Failed to add Student Basic Details.`);
            } else {
              sessionStorage.setItem('insertedStudentID', Number(res).toString());
              // alert('Student registration - Basic Details added successfully.');
              Swal.fire({
                title: 'Success!',
                text: 'Student Basic Details added Successfully.',
                icon: 'success',
                confirmButtonText: 'Cool'
              });
              this.ResetForm();
              const tabElement = document.querySelector('a[href="#nav-tab-parents-details"]');
              if (this.editProfile = 0) {
                if (tabElement) {
                  this.renderer.removeClass(tabElement, 'disabled');
                  this.renderer.setProperty(tabElement, 'aria-selected', 'true');
                  tabElement.dispatchEvent(new Event('click'));
                }
              } else {
                if (tabElement) {
                  this.renderer.setProperty(tabElement, 'aria-selected', 'true');
                  tabElement.dispatchEvent(new Event('click'));
                }
              }
            }
          },
          (error) => {
            this.showAlert('Error!', `Failed to add Student Basic Details. Error: ${error.message || error}`);
          }
        );
    }
    else {
      const fileInput = document.getElementById('profileImage');
      if (fileInput) {
        fileInput.focus();
      }
      alert("Please select Profile Image.")
    }
  }
  ResetForm() {
    if (this.StudentPersonalDetailsForm) {
      this.StudentPersonalDetailsForm.reset();
    }
  }

  showAlert(title: string, text: string) {
    Swal.fire({
      title: title,
      text: text,
      icon: 'error',
      confirmButtonText: 'Retry'
    });
  }

  showSuccess(title: string, text: string) {
    Swal.fire({
      title: title,
      text: text,
      icon: 'success',
      confirmButtonText: 'Cool'
    });
  }


  /* #region Getter methods */

  get FirstName(): FormControl {
    return this.StudentPersonalDetailsForm.get('firstName') as FormControl;
  }
  get LastName(): FormControl {
    return this.StudentPersonalDetailsForm.get('lastName') as FormControl;
  }
  get Gender(): FormControl {
    return this.StudentPersonalDetailsForm.get('gender') as FormControl;
  }
  get BirthDate(): FormControl {
    return this.StudentPersonalDetailsForm.get('birthDate') as FormControl;
  }
  get StudentSchoolEmailID(): FormControl {
    return this.StudentPersonalDetailsForm.get(
      'studentSchoolEmailID'
    ) as FormControl;
  }
  get BloodGroup(): FormControl {
    return this.StudentPersonalDetailsForm.get('bloodGroup') as FormControl;
  }
  get EmergencyContactNo(): FormControl {
    return this.StudentPersonalDetailsForm.get(
      'emergencyContactNo'
    ) as FormControl;
  }
  get WhatsappNumber(): FormControl {
    return this.StudentPersonalDetailsForm.get('whatsappNumber') as FormControl;
  }
  get HouseNo(): FormControl {
    return this.StudentPersonalDetailsForm.get('houseNo') as FormControl;
  }
  get SocietyName(): FormControl {
    return this.StudentPersonalDetailsForm.get('societyName') as FormControl;
  }
  get Landmark(): FormControl {
    return this.StudentPersonalDetailsForm.get('landmark') as FormControl;
  }
  get Area(): FormControl {
    return this.StudentPersonalDetailsForm.get('area') as FormControl;
  }
  get City(): FormControl {
    return this.StudentPersonalDetailsForm.get('city') as FormControl;
  }
  get Zip(): FormControl {
    return this.StudentPersonalDetailsForm.get('zip') as FormControl;
  }
  get State(): FormControl {
    return this.StudentPersonalDetailsForm.get('state') as FormControl;
  }
  get Country(): FormControl {
    return this.StudentPersonalDetailsForm.get('country') as FormControl;
  }
  get House(): FormControl {
    return this.StudentPersonalDetailsForm.get('house') as FormControl;
  }
  get ImagePath(): FormControl {
    return this.StudentPersonalDetailsForm.get('imagePath') as FormControl;
  }
  get AadharCardNo(): FormControl {
    return this.StudentPersonalDetailsForm.get('aadharCardNo') as FormControl;
  }
  get Nationality(): FormControl {
    return this.StudentPersonalDetailsForm.get('nationality') as FormControl;
  }
  get Religion(): FormControl {
    return this.StudentPersonalDetailsForm.get('religion') as FormControl;
  }
  get Caste(): FormControl {
    return this.StudentPersonalDetailsForm.get('caste') as FormControl;
  }
  get SubCaste(): FormControl {
    return this.StudentPersonalDetailsForm.get('subCaste') as FormControl;
  }
  get ResignationDate(): FormControl {
    return this.StudentPersonalDetailsForm.get('resignationDate') as FormControl;
  }
  get UDISENumber(): FormControl {
    return this.StudentPersonalDetailsForm.get('UDISENumber') as FormControl;
  }
  get PENNumber(): FormControl {
    return this.StudentPersonalDetailsForm.get('PENNumber') as FormControl;
  }

  /* #endregion */
}
