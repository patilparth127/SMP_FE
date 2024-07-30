import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { MasterPageComponent } from '../../../../components/master-page/master-page.component';
import { SharedService } from '../../../../services/shared.service';
import { AcademicProgramComponent } from '../academic-program/academic-program.component';
import { SchoolMasterService } from '../../../../services/school-master-services/school-master.service';
import { AcademicYearModel } from '../../../../models/school-master/academic-master/academic-year.model';
import { SectionModel } from '../../../../models/school-master/academic-master/section.model';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MasterPageComponent,
    FormsModule,
  ],
  templateUrl: './section.component.html',
  styleUrl: './section.component.css',
})
export class SectionComponent {
  private reloadSubscription!: Subscription;

  constructor(
    private schoolMaster: SchoolMasterService,
    private sharedService: SharedService
  ) {}
  ngOnInit(): void {
    this.reloadSubscription = this.sharedService
      .getReloadObservable()
      .subscribe(() => {
        this.fetchAllAcademicYear();
        this.fetchAllAcademicBoard();
        this.sort('sectionName');
      });
  }

  allAcademicYear: any;
  allAcademicBoard: any;
  allAcademicProgram: any;
  allSection: any;
  allGrade: any;
  allGradeForGrid: any;
  buttonLabel: string = 'Save';
  editedSectionID: number = 0;
  selectedSectionID: number = 0;
  selectedProgram: any;
  allAcademicYearFilter: any;
  allAcademicBoardFilter: any;
  allAcademicProgramFilter: any;
  selectedAcademicYearFilter: number = 0;
  selectedAcademicBoardFilter: number = 1;
  selectedAcademicProgramFilter: number = 1;
  selectedGradeFilter: number = 1;
  selectedAcademicProgram: number = 0;
  selectedGradeID: number = 0;
  isProgramNameEmpty: boolean = true;
  isBoardNameEmpty: boolean = true;
  isAcademicYearEmpty: boolean = true;
  isGradeEmpty: boolean = true;

  sectionForm = new FormGroup({
    academicYear: new FormControl('', [Validators.required]),
    boardName: new FormControl('', [Validators.required]),
    programName: new FormControl('', [Validators.required]),
    sectionName: new FormControl('', [Validators.required]),
    grade: new FormControl('', [Validators.required]),
  });
  academicYearValidator(control: FormControl) {
    if (control.value === 0) {
      return { required: true };
    }
    return null;
  }
  AcademicYearInput() {
    this.isAcademicYearEmpty = false;
  }
  boardNameInput() {
    this.isProgramNameEmpty = true;
    this.isBoardNameEmpty = false;
  }
  programNameInput(event: any) {
    this.isProgramNameEmpty = false;
    this.sectionForm.value.programName = event.target.value;
    this.fetchAllGrade();
  }
  gradeInput() {
    this.isGradeEmpty = false;
  }

  fetchAllAcademicYear() {
    this.schoolMaster.GetAllAcademicYear().subscribe(
      (data) => {
        console.log('GetAllAcademicYear Response:');
        console.log(data);
        this.allAcademicYear = data;
        // Set default selection
        this.sectionForm.patchValue({ academicYear: '0' });
        this.allAcademicYearFilter = data;
        let selectedAcademicYear: AcademicYearModel;
        selectedAcademicYear = this.allAcademicYearFilter.filter(
          (year: AcademicYearModel) => year.isDefault
        )[0];
        this.selectedAcademicYearFilter = selectedAcademicYear.academicYearID;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  fetchAllAcademicBoard() {
    this.schoolMaster.GetAllAcademicBoard().subscribe(
      (data) => {
        console.log('GetAllAcademicBoard Response:');
        console.log(data);
        this.allAcademicBoard = data;
        // Set default selection
        this.sectionForm.patchValue({ boardName: '0' });
        this.allAcademicBoardFilter = data;
        this.fetchAllAcademicProgramByBoardIDForFilter(
          this.selectedAcademicBoardFilter
        );
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  fetchAllAcademicProgramByBoardID() {
    this.schoolMaster
      .GetAllProgramByBoardID(Number(this.sectionForm.value.boardName))
      .subscribe(
        (data) => {
          console.log('GetAllProgramByBoardID Response:');
          console.log(data);
          this.allAcademicProgram = data;
          // Set default selection
          this.sectionForm.patchValue({ programName: '0' });
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }
  fetchAllAcademicProgramByBoardIDForFilter(boardID: number) {
    this.schoolMaster.GetAllProgramByBoardID(boardID).subscribe(
      (data) => {
        console.log('GetAllProgramByBoardID Response:');
        console.log(data);
        this.allAcademicProgramFilter = data;
        const programId = data.length > 0 ? data[0].programID : 1;
        this.selectedAcademicProgramFilter = programId;
        this.fetchallSections();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  fetchallSections() {
    this.schoolMaster
      .GetAllSectionByAcademicYearIDNProgramID(
        this.selectedAcademicYearFilter,
        this.selectedAcademicProgramFilter
      )
      .subscribe(
        (data) => {
          console.log('GetAllSectionByAcademicYearIDNProgramID Response:');
          console.log(data);
          this.fetchAllGradeForGrid();
          this.allSection = data;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }
  fetchAllGradeForGrid() {
    this.schoolMaster
      .GetAllGradeByProgramID(Number(this.selectedAcademicProgramFilter))
      .subscribe(
        (data) => {
          console.log('GetAllGradeByProgramID Response:');
          console.log(data);
          this.allGradeForGrid = data;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }
  fetchAllGrade() {
    this.schoolMaster
      .GetAllGradeByProgramID(Number(this.sectionForm.value.programName))
      .subscribe(
        (data) => {
          console.log('GetAllGradeByProgramID Response:');
          console.log(data);
          this.allGrade = data;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }
  AcademicYearFilterChanged(event: any) {
    this.selectedAcademicYearFilter = event.target.value;
  }
  BoardNameFilterChanged(event: any) {
    this.selectedAcademicBoardFilter = event.target.value;
    this.fetchAllAcademicProgramByBoardIDForFilter(
      this.selectedAcademicBoardFilter
    );
  }
  ProgramNameFilterChanged(event: any) {
    this.selectedAcademicProgramFilter = event.target.value;
    this.fetchallSections();
  }
  UpsertSection() {
    let objSection: SectionModel;
    objSection = {
      sectionID: this.editedSectionID,
      academicYearID: Number(this.AcademicYear.value),
      boardID: Number(this.BoardName.value),
      programID: Number(this.ProgramName.value),
      gradeID: Number(this.Grade.value),
      sectionName: this.sectionName.value,
      isDeleted: false,
      createdDateTime: new Date(),
      createdBy: 0,
      updatedDateTime: new Date(),
      updatedBy: 0,
    };

    this.schoolMaster.UpsertSection(objSection).subscribe(
      (res) => {
        console.log('UpsertSection Response:');
        console.log(res);
        if (res === null || res === undefined) {
          alert('Something went wrong.');
        } else {
          this.fetchallSections();
          if (this.editedSectionID === 0) {
            alert('Section added successfully.');
            if (
              this.sectionForm.value.academicYear !== null &&
              this.sectionForm.value.academicYear !== undefined &&
              this.sectionForm.value.academicYear !== '0'
            ) {
              this.selectedAcademicYearFilter = Number(
                this.sectionForm.value.academicYear
              );
            } else {
              this.selectedAcademicYearFilter = 0;
            }
            if (
              this.sectionForm.value.boardName !== null &&
              this.sectionForm.value.boardName !== undefined &&
              this.sectionForm.value.boardName !== '0'
            ) {
              this.selectedAcademicBoardFilter = Number(
                this.sectionForm.value.boardName
              );
            } else {
              this.selectedAcademicBoardFilter = 0;
            }
            this.schoolMaster
              .GetAllProgramByBoardID(this.selectedAcademicBoardFilter)
              .subscribe(
                (data) => {
                  console.log('GetAllProgramByBoardID Response:');
                  console.log(data);
                  this.allAcademicProgramFilter = data;
                },
                (error) => {
                  console.error('Error:', error);
                }
              );
            if (
              this.sectionForm.value.programName !== null &&
              this.sectionForm.value.programName !== undefined &&
              this.sectionForm.value.programName !== '0'
            ) {
              this.selectedAcademicProgramFilter = Number(
                this.sectionForm.value.programName
              );
            } else {
              this.selectedAcademicProgramFilter = 0;
            }
            this.fetchallSections();
            this.ResetForm();
            this.editedSectionID = 0;
          } else {
            alert('Section updated successfully.');
            if (
              this.AcademicYear.value !== null &&
              this.AcademicYear.value !== undefined &&
              this.AcademicYear.value !== '0'
            ) {
              this.selectedAcademicYearFilter = Number(this.AcademicYear.value);
            } else {
              this.selectedAcademicYearFilter = 0;
            }
            if (
              this.BoardName.value !== null &&
              this.BoardName.value !== undefined &&
              this.BoardName.value !== '0'
            ) {
              this.selectedAcademicBoardFilter = Number(this.BoardName.value);
            } else {
              this.selectedAcademicBoardFilter = 0;
            }
            if (
              this.ProgramName.value !== null &&
              this.ProgramName.value !== undefined &&
              this.ProgramName.value !== '0'
            ) {
              this.selectedAcademicProgramFilter = Number(
                this.ProgramName.value
              );
            } else {
              this.selectedAcademicProgramFilter = 0;
            }
            this.fetchallSections();
            this.ResetForm();
            this.editedSectionID = 0;
          }
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  EditSection(section: any) {
    this.selectedSectionID = section.sectionID;
    this.sectionForm.patchValue({
      boardName: section.boardID,
    });
    this.fetchAllAcademicProgramByBoardID();
    this.sectionForm.patchValue({
      academicYear: section.academicYearID,
      boardName: section.boardID,
      programName: section.programID,
      sectionName: section.sectionName,
    });
    this.fetchAllGrade();
    this.sectionForm.patchValue({
      grade: section.gradeID,
    });
    this.buttonLabel = 'Update';
    this.editedSectionID = section.sectionID;
    this.isGradeEmpty = false;
    this.isProgramNameEmpty = false;
    this.isBoardNameEmpty = false;
    this.isAcademicYearEmpty = false;
    this.AcademicYear.disable();
    this.BoardName.disable();
    this.ProgramName.disable();
  }
  RemoveSection(sectionID: number) {
    if (!confirm('Are you sure you want to remove?')) {
      return;
    }
    this.schoolMaster.DeleteSectionBySectionID(sectionID).subscribe(
      (res) => {
        console.log('DeleteSectionBySectionID Response:');
        console.log(res);
        if (res === null || res === undefined) {
          alert('Something went wrong.');
        } else {
          this.fetchallSections();
          // alert('Section removed successfully.');
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  ResetForm() {
    this.selectedSectionID = 0;
    this.sectionForm.reset();
    this.buttonLabel = 'Save';
    this.editedSectionID = 0;
    this.isProgramNameEmpty = true;
    this.isBoardNameEmpty = true;
    this.isAcademicYearEmpty = true;
    this.sectionForm.patchValue({
      academicYear: '0',
      boardName: '0',
      programName: '0',
      grade: '0',
    });
    this.AcademicYear.enable();
    this.BoardName.enable();
    this.ProgramName.enable();
  }

  HighlightSelectedRow(selectedSectionID: number) {
    this.selectedSectionID = selectedSectionID;
  }

  sortDirection: number = 1;
  sort(key: string) {
    if (this.allSection) {
      this.sortDirection = this.sortDirection === 1 ? -1 : 1;
      this.allSection = this.allSection.sort(
        (a: { [x: string]: number }, b: { [x: string]: number }) => {
          if (a[key] < b[key]) return -1 * this.sortDirection;
          if (a[key] > b[key]) return 1 * this.sortDirection;
          return 0;
        }
      );
    }
  }

  get AcademicYear(): FormControl {
    return this.sectionForm.get('academicYear') as FormControl;
  }
  get BoardName(): FormControl {
    return this.sectionForm.get('boardName') as FormControl;
  }
  get ProgramName(): FormControl {
    return this.sectionForm.get('programName') as FormControl;
  }
  get Grade(): FormControl {
    return this.sectionForm.get('grade') as FormControl;
  }
  get sectionName(): FormControl {
    return this.sectionForm.get('sectionName') as FormControl;
  }
}
