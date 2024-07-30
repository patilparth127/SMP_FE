import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MasterPageComponent } from '../../../../components/master-page/master-page.component';
import { SchoolMasterService } from '../../../../services/school-master-services/school-master.service';
import { AcademicYearModel } from '../../../../models/school-master/academic-master/academic-year.model';

@Component({
  selector: 'app-academic-year',
  standalone: true,
  templateUrl: './academic-year.component.html',
  styleUrl: './academic-year.component.css',
  imports: [CommonModule, ReactiveFormsModule, MasterPageComponent],
  providers: [DatePipe],
})
export class AcademicYearComponent implements OnInit {
  constructor(
    private schoolMaster: SchoolMasterService,
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.fetchAllAcademicYears();
    this.sort('academicYear');
  }

  allAcademicYear: any;
  buttonLabel: string = 'Save';
  editedAcademicYearID: number = 0;

  fetchAllAcademicYears() {
    this.schoolMaster.GetAllAcademicYear().subscribe(
      (data) => {
        console.log('GetAllAcademicYear Response:');
        console.log(data);
        this.allAcademicYear = data;
        for (const academicYear of this.allAcademicYear) {
          academicYear.fromDate = academicYear.fromDate.split('T')[0];
          academicYear.toDate = academicYear.toDate.split('T')[0];
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  selectedAcademicYearID: number = 0;

  academicYearForm = new FormGroup({
    fromDate: new FormControl('', [Validators.required]),
    toDate: new FormControl('', [Validators.required]),
    isDefault: new FormControl(),
  });

  UpsertAcademicYear() {
    if (
      this.academicYearForm.value.fromDate &&
      this.academicYearForm.value.toDate
    ) {
      if (
        this.academicYearForm.value.fromDate >=
        this.academicYearForm.value.toDate
      ) {
        alert('From date should be less than To date');
        return;
      }
    }
    console.log('this.editedAcademicYearID');
    console.log(this.editedAcademicYearID);
    let objAcademicYear: AcademicYearModel;
    objAcademicYear = {
      academicYearID: this.editedAcademicYearID,
      academicYear: '',
      fromDate: new Date(this.academicYearForm.value.fromDate ?? ''),
      toDate: new Date(this.academicYearForm.value.toDate ?? ''),
      isDefault: Boolean(this.academicYearForm.value.isDefault),
      isDeleted: false,
      createdDateTime: new Date(),
      createdBy: 0,
      updatedDateTime: new Date(),
      updatedBy: 0,
    };

    this.schoolMaster.InsertNUpdateAcademicYear(objAcademicYear).subscribe(
      (res) => {
        console.log('InsertNUpdateAcademicYear Response:');
        console.log(res);
        if (res === null || res === undefined) {
          alert('Something went wrong.');
        } else {
          this.fetchAllAcademicYears();
          if (this.editedAcademicYearID === 0) {
            alert('Academic Year added successfully.');
          } else {
            alert('Academic Year updated successfully.');
            this.editedAcademicYearID = 0;
          }
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    this.academicYearForm.reset();
    this.buttonLabel = 'Save';
  }
  editAcademicYear(academicYear: any) {
    this.selectedAcademicYearID = academicYear.academicYearID;
    this.academicYearForm.patchValue({
      fromDate: academicYear.fromDate,
      toDate: academicYear.toDate,
      isDefault: academicYear.isDefault,
    });
    this.buttonLabel = 'Update';
    this.editedAcademicYearID = academicYear.academicYearID;
  }
  RemoveAcademicYear(academicYear: any) {
    if (!confirm('Are you sure you want to remove?')) {
      return;
    }
    this.schoolMaster
      .DeleteAcademicYearByAcademicYearID(academicYear.academicYearID)
      .subscribe(
        (res) => {
          console.log('DeleteAcademicYearByAcademicYearID Response:');
          console.log(res);
          if (res === null || res === undefined) {
            alert('Something went wrong.');
          } else {
            // alert('Academic Year removed successfully.');
            this.fetchAllAcademicYears();
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }
  convertToDateInDDMMYYYYFormat(date: Date): string {
    return this.datePipe.transform(date, 'dd-MMM-yyyy') || '';
  }
  HighlightSelectedRow(selectedAcademicYearID: number) {
    this.selectedAcademicYearID = selectedAcademicYearID;
  }
  
  ResetForm() {
    this.academicYearForm.reset();
    this.selectedAcademicYearID = 0;
    this.buttonLabel = 'Save';
    this.editedAcademicYearID = 0;
  }
  
  sortDirection: number = 1;
  sort(key: string) {
    if (this.allAcademicYear) {
      this.sortDirection = this.sortDirection === 1 ? -1 : 1;
      this.allAcademicYear = this.allAcademicYear.sort(
        (a: { [x: string]: number }, b: { [x: string]: number }) => {
          if (a[key] < b[key]) return -1 * this.sortDirection;
          if (a[key] > b[key]) return 1 * this.sortDirection;
          return 0;
        }
      );
    }
  }
  get FromDate(): FormControl {
    return this.academicYearForm.get('fromDate') as FormControl;
  }
  get ToDate(): FormControl {
    return this.academicYearForm.get('toDate') as FormControl;
  }
  get IsDefault(): FormControl {
    return this.academicYearForm.get('isDefault') as FormControl;
  }
}
