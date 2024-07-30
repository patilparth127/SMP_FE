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
import { SharedService } from '../../../../services/shared.service';
import { SchoolMasterService } from '../../../../services/school-master-services/school-master.service';
import { AcademicYearModel } from '../../../../models/school-master/academic-master/academic-year.model';
import { GradeModel } from '../../../../models/school-master/academic-master/grade.model';

@Component({
  selector: 'app-grade',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './grade.component.html',
  styleUrl: './grade.component.css',
})
export class GradeComponent {
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
        this.sort('gradeName');
      });
  }

  isAcademicYearEmpty: boolean = true;
  allAcademicYear: any;
  allAcademicBoard: any;
  allGrade: any;
  isProgramNameEmpty: boolean = true;
  isBoardNameEmpty: boolean = true;
  selectedAcademicProgram: number = 0;
  allAcademicProgram: any;
  allAcademicProgramFilter: any;
  buttonLabel: string = 'Save';
  editedGradeID: number = 0;
  selectedAcademicBoardFilter: number = 1;
  selectedGradeID: number = 0;
  selectedAcademicYearFilter: number = 1;
  allAcademicYearFilter: any;
  allAcademicBoardFilter: any;

  GradeForm = new FormGroup({
    academicYear: new FormControl('', [Validators.required]),
    boardName: new FormControl('', [Validators.required]),
    programName: new FormControl('', [Validators.required]),
    gradeName: new FormControl('', [Validators.required]),
    gradeSeqNumber: new FormControl('', [Validators.required]),
  });

  AcademicYearInput() {
    this.isAcademicYearEmpty = false;
  }

  fetchAllAcademicYear() {
    this.schoolMaster.GetAllAcademicYear().subscribe(
      (data) => {
        console.log('GetAllAcademicYear Response:');
        console.log(data);
        this.allAcademicYear = data;
        // Set default selection
        this.GradeForm.patchValue({ academicYear: '0' });
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

  boardNameInput() {
    this.isProgramNameEmpty = true;
    this.isBoardNameEmpty = false;
  }

  fetchAllAcademicBoard() {
    this.schoolMaster.GetAllAcademicBoard().subscribe(
      (data) => {
        console.log('GetAllAcademicBoard Response:');
        console.log(data);
        this.allAcademicBoard = data;
        // Set default selection
        this.GradeForm.patchValue({ boardName: '0' });
        this.allAcademicBoardFilter = data;
        this.fetchallGrade();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  programNameInput(event: any) {
    this.isProgramNameEmpty = false;
    this.GradeForm.value.programName = event.target.value;
  }

  fetchAllAcademicProgramByBoardID() {
    this.schoolMaster
      .GetAllProgramByBoardID(Number(this.GradeForm.value.boardName))
      .subscribe(
        (data) => {
          console.log('GetAllProgramByBoardID Response:');
          console.log(data);
          this.allAcademicProgram = data;
          // Set default selection
          if (this.GradeForm.value.programName) {
            this.GradeForm.patchValue({ programName: '0' });
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  fetchAllAcademicProgramByBoardIDFilter() {
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
  }

  UpsertGrade() {
    let objGradeModel: GradeModel;
    objGradeModel = {
      gradeID: this.editedGradeID,
      academicYearID: Number(this.AcademicYear.value),
      boardID: Number(this.BoardName.value),
      programID: Number(this.ProgramName.value),
      gradeName: this.GradeName.value,
      gradeSeqNo: this.GradeSeqNumber.value,
      isDeleted: false,
      createdDateTime: new Date(),
      createdBy: 0,
      updatedDateTime: new Date(),
      updatedBy: 0,
    };

    this.schoolMaster.UpsertGrade(objGradeModel).subscribe(
      (res) => {
        console.log('UpsertGrade Response:');
        console.log(res);
        if (res === null || res === undefined) {
          alert('Something went wrong.');
        } else {
          if (this.editedGradeID === 0) {
            this.selectedGradeID = Number(res);
            alert('Grade added successfully.');
            if (
              this.GradeForm.value.academicYear !== null &&
              this.GradeForm.value.academicYear !== undefined &&
              this.GradeForm.value.academicYear !== '0'
            ) {
              this.selectedAcademicYearFilter = Number(
                this.GradeForm.value.academicYear
              );
            } else {
              this.selectedAcademicYearFilter = 0;
            }
            if (
              this.GradeForm.value.boardName !== null &&
              this.GradeForm.value.boardName !== undefined &&
              this.GradeForm.value.boardName !== '0'
            ) {
              this.selectedAcademicBoardFilter = Number(
                this.GradeForm.value.boardName
              );
            } else {
              this.selectedAcademicBoardFilter = 0;
            }
            this.fetchallGrade();
            this.ResetForm();
            this.editedGradeID = 0;
          } else {
            this.selectedGradeID = this.editedGradeID;
            alert('Grade updated successfully.');
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
            this.fetchallGrade();
            this.ResetForm();
            this.editedGradeID = 0;
          }
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  EditGrade(grade: any) {
    this.selectedGradeID = grade.gradeID;
    this.GradeForm.patchValue({
      academicYear: grade.academicYearID,
      boardName: grade.boardID,
      gradeName: grade.gradeName,
      gradeSeqNumber: grade.gradeSeqNo,
    });
    this.fetchAllAcademicProgramByBoardID();
    this.GradeForm.patchValue({
      programName: grade.programID,
    });
    this.buttonLabel = 'Update';
    this.editedGradeID = grade.gradeID;
    this.isProgramNameEmpty = false;
    this.isBoardNameEmpty = false;
    this.isAcademicYearEmpty = false;
    this.AcademicYear.disable();
    this.BoardName.disable();
    this.ProgramName.disable();
  }
  RemoveGrade(gradeID: number) {
    if (!confirm('Are you sure you want to remove?')) {
      return;
    }
    this.schoolMaster.DeleteGradeByGradeID(gradeID).subscribe(
      (res) => {
        console.log('DeleteGradeByGradeID Response:');
        console.log(res);
        if (res === null || res === undefined) {
          alert('Something went wrong.');
        } else {
          this.fetchallGrade();
          // alert('Grade removed successfully.');
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  fetchallGrade() {
    this.fetchAllAcademicProgramByBoardIDFilter();
    this.schoolMaster
      .GetAllGradeByAcademicYearIDNBoardID(
        this.selectedAcademicYearFilter,
        this.selectedAcademicBoardFilter
      )
      .subscribe(
        (data) => {
          console.log('GetAllGradeByAcademicYearIDNBoardID Response:');
          console.log(data);
          this.allGrade = data;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  ResetForm() {
    this.GradeForm.reset();
    this.buttonLabel = 'Save';
    this.editedGradeID = 0;
    this.isAcademicYearEmpty = true;
    this.isBoardNameEmpty = true;
    this.isProgramNameEmpty = true;
    // Set default selection
    this.GradeForm.patchValue({
      academicYear: '0',
      boardName: '0',
      programName: '0',
    });
    this.AcademicYear.enable();
    this.BoardName.enable();
    this.ProgramName.enable();
  }

  AcademicYearFilterChanged(event: any) {
    this.selectedAcademicYearFilter = event.target.value;
    this.fetchallGrade();
  }

  BoardNameFilterChanged(event: any) {
    this.selectedAcademicBoardFilter = event.target.value;
    this.fetchallGrade();
  }

  HighlightSelectedRow(selectedGradeID: number) {
    this.selectedGradeID = selectedGradeID;
  }

  sortDirection: number = 1;
  sort(key: string) {
    if (this.allGrade) {
      this.sortDirection = this.sortDirection === 1 ? -1 : 1;
      this.allGrade = this.allGrade.sort(
        (a: { [x: string]: number }, b: { [x: string]: number }) => {
          if (a[key] < b[key]) return -1 * this.sortDirection;
          if (a[key] > b[key]) return 1 * this.sortDirection;
          return 0;
        }
      );
    }
  }

  get AcademicYear(): FormControl {
    return this.GradeForm.get('academicYear') as FormControl;
  }
  get BoardName(): FormControl {
    return this.GradeForm.get('boardName') as FormControl;
  }
  get ProgramName(): FormControl {
    return this.GradeForm.get('programName') as FormControl;
  }
  get GradeName(): FormControl {
    return this.GradeForm.get('gradeName') as FormControl;
  }
  get GradeSeqNumber(): FormControl {
    return this.GradeForm.get('gradeSeqNumber') as FormControl;
  }
}
