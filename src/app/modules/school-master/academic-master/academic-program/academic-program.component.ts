import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { MasterPageComponent } from '../../../../components/master-page/master-page.component';
import { SharedService } from '../../../../services/shared.service';
import { SchoolMasterService } from '../../../../services/school-master-services/school-master.service';
import { AcademicProgramModel } from '../../../../models/school-master/academic-master/academic-program.model';

@Component({
  selector: 'app-academic-program',
  standalone: true,
  templateUrl: './academic-program.component.html',
  styleUrl: './academic-program.component.css',
  imports: [CommonModule, ReactiveFormsModule, MasterPageComponent],
})
export class AcademicProgramComponent {
  private reloadSubscription!: Subscription;
  constructor(
    private schoolMaster: SchoolMasterService,
    private sharedService: SharedService
  ) {}
  ngOnInit(): void {
    this.reloadSubscription = this.sharedService
      .getReloadObservable()
      .subscribe(() => {
        this.fetchAllAcademicProgram();
        this.fetchAllAcademicBoard();
        this.sort('programSeqNo');
      });
  }

  allAcademicProgram: any;
  allAcademicBoard: any;
  buttonLabel: string = 'Save';
  editedProgramID: number = 0;
  selectedProgramID: any;
  isBoardNameEmpty: boolean = true;

  AcademicProgramForm = new FormGroup({
    programName: new FormControl('', [Validators.required]),
    boardName: new FormControl('0', [Validators.required]),
    programSeqNumber: new FormControl('', [Validators.required]),
  });

  fetchAllAcademicBoard() {
    this.schoolMaster.GetAllAcademicBoard().subscribe(
      (data) => {
        console.log('GetAllAcademicBoard Response:');
        console.log(data);
        this.allAcademicBoard = data;
        // Set default selection
        this.AcademicProgramForm.patchValue({ boardName: '0' });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  fetchAllAcademicProgram() {
    this.schoolMaster.GetAllAcademicProgram().subscribe(
      (data) => {
        console.log('GetAllAcademicProgram Response:');
        console.log(data);
        this.allAcademicProgram = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  boardNameInput() {
    this.isBoardNameEmpty = false;
  }
  UpsertAcademicProgram() {
    let objAcademicProgram: AcademicProgramModel;
    objAcademicProgram = {
      programID: this.editedProgramID,
      boardID: this.BoardName.value,
      programName: this.ProgramName.value,
      boardName: '',
      programSeqNo: this.ProgramSeqNumber.value,
      isDeleted: false,
      createdDateTime: new Date(),
      createdBy: 0,
      updatedDateTime: new Date(),
      updatedBy: 0,
    };

    this.schoolMaster.UpsertAcademicProgram(objAcademicProgram).subscribe(
      (res) => {
        console.log('UpsertAcademicProgram Response:');
        console.log(res);
        if (res === null || res === undefined) {
          alert('Something went wrong.');
        } else {
          this.fetchAllAcademicProgram();
          if (this.editedProgramID === 0) {
            alert('Academic Program added successfully.');
          } else {
            alert('Academic Program updated successfully.');
            this.editedProgramID = 0;
          }
          this.ResetForm();
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    this.AcademicProgramForm.reset();
    this.buttonLabel = 'Save';
    this.isBoardNameEmpty = true;
  }
  EditAcademicProgram(academicProgram: any) {
    this.selectedProgramID = academicProgram;
    this.AcademicProgramForm.patchValue({
      boardName: academicProgram.boardID,
      programName: academicProgram.programName,
      programSeqNumber: academicProgram.programSeqNo,
    });
    this.buttonLabel = 'Update';
    this.editedProgramID = academicProgram.programID;
    this.isBoardNameEmpty = true;
  }
  RemoveAcademicProgram(ProgramID: number) {
    if (!confirm('Are you sure you want to remove?')) {
      return;
    }
    this.schoolMaster.DeleteProgramByProgramID(ProgramID).subscribe(
      (res) => {
        console.log('DeleteProgramByProgramID Response:');
        console.log(res);
        if (res === null || res === undefined) {
          alert('Something went wrong.');
        } else {
          // alert('Academic Program removed successfully.');
          this.fetchAllAcademicProgram();
          this.ResetForm();
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  ResetForm() {
    this.selectedProgramID = null;
    this.AcademicProgramForm.reset();
    this.buttonLabel = 'Save';
    this.editedProgramID = 0;
    this.isBoardNameEmpty = true;
    this.AcademicProgramForm.patchValue({ boardName: '0' });
  }
  HighlightSelectedRow(selectedProgramID: number) {
    this.selectedProgramID = selectedProgramID;
  }
  sortDirection: number = 1;
  sort(key: string) {
    if (this.allAcademicProgram) {
      this.sortDirection = this.sortDirection === 1 ? -1 : 1;
      this.allAcademicProgram = this.allAcademicProgram.sort(
        (a: { [x: string]: number }, b: { [x: string]: number }) => {
          if (a[key] < b[key]) return -1 * this.sortDirection;
          if (a[key] > b[key]) return 1 * this.sortDirection;
          return 0;
        }
      );
    }
  }
  get ProgramName(): FormControl {
    return this.AcademicProgramForm.get('programName') as FormControl;
  }
  get BoardName(): FormControl {
    return this.AcademicProgramForm.get('boardName') as FormControl;
  }
  get ProgramSeqNumber(): FormControl {
    return this.AcademicProgramForm.get('programSeqNumber') as FormControl;
  }
}
