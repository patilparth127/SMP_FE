import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { AcademicProgramComponent } from '../academic-program/academic-program.component';
import { MasterPageComponent } from '../../../../components/master-page/master-page.component';
import { SharedService } from '../../../../services/shared.service';
import { SchoolMasterService } from '../../../../services/school-master-services/school-master.service';
import { AcademicTermModel } from '../../../../models/school-master/academic-master/academic-term.model';
import { AcademicYearModel } from '../../../../models/school-master/academic-master/academic-year.model';


@Component({
  selector: 'app-academic-term',
  standalone: true,
  templateUrl: './academic-term.component.html',
  styleUrl: './academic-term.component.css',
  providers: [DatePipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MasterPageComponent,
    FormsModule,
  ],
})
export class AcademicTermComponent {
  private reloadSubscription!: Subscription;
  constructor(
    private schoolMaster: SchoolMasterService,
    private datePipe: DatePipe,
    private sharedService: SharedService
  ) {}
  ngOnInit(): void {
    this.reloadSubscription = this.sharedService
      .getReloadObservable()
      .subscribe(() => {
        this.fetchAllAcademicYear();
        this.fetchAllAcademicBoard();
        this.sort('termName');
      });
  }

  allAcademicYear: any;
  allAcademicBoard: any;
  allAcademicProgram: any;
  allAcademicTerm: any;
  buttonLabel: string = 'Save';
  editedAcademicTermID: number = 0;
  selectedAcademicTermID: number = 0;
  selectedProgram: any;
  allAcademicYearFilter: any;
  allAcademicBoardFilter: any;
  allAcademicProgramFilter: any;
  selectedAcademicYearFilter: number = 0;
  selectedAcademicBoardFilter: number = 1;
  selectedAcademicProgram: number = 0;
  isProgramNameEmpty: boolean = true;
  isBoardNameEmpty: boolean = true;
  isAcademicYearEmpty: boolean = true;

  academicTermForm = new FormGroup({
    academicYear: new FormControl('', [Validators.required]),
    boardName: new FormControl('', [Validators.required]),
    programName: new FormControl('', [Validators.required]),
    termName: new FormControl('', [Validators.required]),
    fromDate: new FormControl('', [Validators.required]),
    toDate: new FormControl('', [Validators.required]),
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
  programNameInput() {
    this.isProgramNameEmpty = false;
  }

  fetchAllAcademicYear() {
    this.schoolMaster.GetAllAcademicYear().subscribe(
      (data) => {
        console.log('GetAllAcademicYear Response:');
        console.log(data);
        this.allAcademicYear = data;
        // Set default selection
        this.academicTermForm.patchValue({ academicYear: '0' });
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
        this.academicTermForm.patchValue({ boardName: '0' });

        this.allAcademicBoardFilter = data;

        this.fetchAllAcademicTerms(
          this.selectedAcademicYearFilter,
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
      .GetAllProgramByBoardID(Number(this.academicTermForm.value.boardName))
      .subscribe(
        (data) => {
          console.log('GetAllProgramByBoardID Response:');
          console.log(data);
          this.allAcademicProgram = data;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  fetchAllAcademicTerms(academicYearID: number, boardID: number) {
    this.schoolMaster.GetAllProgramByBoardID(boardID).subscribe(
      (data) => {
        console.log('GetAllProgramByBoardID Response:');
        console.log(data);
        this.allAcademicProgramFilter = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );

    this.schoolMaster.GetallTermByAYIDNBoard(academicYearID, boardID).subscribe(
      (data) => {
        console.log('GetallTermByAYIDNBoard Response:');
        console.log(data);
        for (const academicTerm of data) {
          academicTerm.fromDate = academicTerm.fromDate.split('T')[0];
          academicTerm.toDate = academicTerm.toDate.split('T')[0];
        }
        this.allAcademicTerm = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  AcademicYearFilterChanged(event: any) {
    this.selectedAcademicYearFilter = event.target.value;
    this.fetchAllAcademicTerms(
      this.selectedAcademicYearFilter,
      this.selectedAcademicBoardFilter
    );
  }
  BoardNameFilterChanged(event: any) {
    this.selectedAcademicBoardFilter = event.target.value;
    this.fetchAllAcademicTerms(
      this.selectedAcademicYearFilter,
      this.selectedAcademicBoardFilter
    );
  }
  UpsertAcademicTerm() {
    if (
      this.academicTermForm.value.fromDate &&
      this.academicTermForm.value.toDate
    ) {
      if (
        this.academicTermForm.value.fromDate >=
        this.academicTermForm.value.toDate
      ) {
        alert('From date should be less than To date');
        return;
      }
    }
    console.log('this.editedAcademicTermID');
    console.log(this.editedAcademicTermID);
    let objAcademicTerm: AcademicTermModel;
    objAcademicTerm = {
      termID: this.editedAcademicTermID,
      academicYearID: Number(this.AcademicYear.value),
      boardID: Number(this.BoardName.value),
      programID: Number(this.ProgramName.value),
      termName: this.TermName.value ?? '',
      fromDate: new Date(this.academicTermForm.value.fromDate ?? ''),
      toDate: new Date(this.academicTermForm.value.toDate ?? ''),
      isDeleted: false,
      createdDateTime: new Date(),
      createdBy: 0,
      updatedDateTime: new Date(),
      updatedBy: 0,
    };

    this.schoolMaster.UpsertAcademicTerm(objAcademicTerm).subscribe(
      (res) => {
        console.log('UpsertAcademicTerm Response:');
        console.log(res);
        if (res === null || res === undefined) {
          alert('Something went wrong.');
        } else {
          if (Number(res) === 1) {
            this.selectedAcademicTermID = this.editedAcademicTermID;
          } else {
            this.selectedAcademicTermID = Number(res);
          }

          this.fetchAllAcademicTerms(
            this.selectedAcademicYearFilter,
            this.selectedAcademicBoardFilter
          );
          if (this.editedAcademicTermID === 0) {
            alert('Academic Term added successfully.');
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
            this.fetchAllAcademicTerms(
              this.selectedAcademicYearFilter,
              this.selectedAcademicBoardFilter
            );
            this.ResetForm();
            this.editedAcademicTermID = 0;
          } else {
            alert('Academic Term updated successfully.');
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
            this.fetchAllAcademicTerms(
              this.selectedAcademicYearFilter,
              this.selectedAcademicBoardFilter
            );
            this.ResetForm();
            this.editedAcademicTermID = 0;
          }
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  EditAcademicTerm(academicTerm: any) {
    this.selectedAcademicTermID = academicTerm.termID;
    this.academicTermForm.patchValue({
      boardName: academicTerm.boardID,
    });
    this.fetchAllAcademicProgramByBoardID();
    this.academicTermForm.patchValue({
      academicYear: academicTerm.academicYearID,
      boardName: academicTerm.boardID,
      programName: academicTerm.programID,
      termName: academicTerm.termName,
      fromDate: academicTerm.fromDate,
      toDate: academicTerm.toDate,
    });
    this.buttonLabel = 'Update';
    this.editedAcademicTermID = academicTerm.termID;
    this.isProgramNameEmpty = false;
    this.isBoardNameEmpty = false;
    this.isAcademicYearEmpty = false;
    this.AcademicYear.disable();
    this.BoardName.disable();
    this.ProgramName.disable();
  }
  RemoveAcademicTerm(academicTermID: number) {
    if (!confirm('Are you sure you want to remove?')) {
      return;
    }
    this.schoolMaster.DeleteTermByTermID(academicTermID).subscribe(
      (res) => {
        console.log('DeleteTermByTermID Response:');
        console.log(res);
        if (res === null || res === undefined) {
          alert('Something went wrong.');
        } else {
          this.fetchAllAcademicTerms(
            this.selectedAcademicYearFilter,
            this.selectedAcademicBoardFilter
          );
          // alert('Academic Term removed successfully.');
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  ResetForm() {
    this.academicTermForm.reset();
    this.buttonLabel = 'Save';
    this.editedAcademicTermID = 0;
    this.isProgramNameEmpty = true;
    this.isBoardNameEmpty = true;
    this.isAcademicYearEmpty = true;
    this.academicTermForm.patchValue({
      academicYear: '0',
      boardName: '0',
      programName: '0',
    });
    this.AcademicYear.enable();
    this.BoardName.enable();
    this.ProgramName.enable();
  }
  convertToDateInDDMMYYYYFormat(date: Date): string {
    return this.datePipe.transform(date, 'dd-MMM-yyyy') || '';
  }
  HighlightSelectedRow(selectedAcademicTermID: number) {
    this.selectedAcademicTermID = selectedAcademicTermID;
  }

  sortDirection: number = 1;
  sort(key: string) {
    if (this.allAcademicTerm) {
      this.sortDirection = this.sortDirection === 1 ? -1 : 1;
      this.allAcademicTerm = this.allAcademicTerm.sort(
        (a: { [x: string]: number }, b: { [x: string]: number }) => {
          if (a[key] < b[key]) return -1 * this.sortDirection;
          if (a[key] > b[key]) return 1 * this.sortDirection;
          return 0;
        }
      );
    }
  }

  get AcademicYear(): FormControl {
    return this.academicTermForm.get('academicYear') as FormControl;
  }
  get BoardName(): FormControl {
    return this.academicTermForm.get('boardName') as FormControl;
  }
  get ProgramName(): FormControl {
    return this.academicTermForm.get('programName') as FormControl;
  }
  get TermName(): FormControl {
    return this.academicTermForm.get('termName') as FormControl;
  }
  get FromDate(): FormControl {
    return this.academicTermForm.get('fromDate') as FormControl;
  }
  get ToDate(): FormControl {
    return this.academicTermForm.get('toDate') as FormControl;
  }
}
