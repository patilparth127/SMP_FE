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
import { AcademicBoardModel } from '../../../../models/school-master/academic-master/academic-board.model';

@Component({
  selector: 'app-academic-board',
  standalone: true,
  templateUrl: './academic-board.component.html',
  styleUrl: './academic-board.component.css',
  imports: [CommonModule, ReactiveFormsModule, MasterPageComponent],
  providers: [DatePipe],
})
export class AcademicBoardComponent implements OnInit {
  constructor(
    private schoolMaster: SchoolMasterService,
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.fetchAllAcademicBoard();
    this.sort('boardName');
  }

  allAcademicBoard: any;
  buttonLabel: string = 'Save';
  editedAcademicBoardID: number = 0;

  fetchAllAcademicBoard() {
    this.schoolMaster.GetAllAcademicBoard().subscribe(
      (data) => {
        console.log('GetAllAcademicBoard Response:');
        console.log(data);
        this.allAcademicBoard = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  selectedBoardID: number = 0;

  AcademicBoardForm = new FormGroup({
    boardName: new FormControl('', [Validators.required]),
  });

  UpsertAcademicBoard() {
    console.log('this.editedAcademicBoardID');
    console.log(this.editedAcademicBoardID);
    let objAcademicBoard: AcademicBoardModel;
    objAcademicBoard = {
      boardID: this.editedAcademicBoardID,
      boardName: this.AcademicBoardForm.value.boardName ?? '',
      isDeleted: false,
      createdDateTime: new Date(),
      createdBy: 0,
      updatedDateTime: new Date(),
      updatedBy: 0,
    };

    this.schoolMaster.UpsertAcademicBoard(objAcademicBoard).subscribe(
      (res) => {
        console.log('UpsertAcademicBoard Response:');
        console.log(res);
        if (res === null || res === undefined) {
          alert('Something went wrong.');
        } else {
          if (this.editedAcademicBoardID === 0) {
            alert('Academic Board added successfully.');
          } else {
            alert('Academic Board updated successfully.');
            this.editedAcademicBoardID = 0;
          }
          this.fetchAllAcademicBoard();
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    this.AcademicBoardForm.reset();
    this.buttonLabel = 'Save';
  }
  EditAcademicBoard(academicBoard: any) {
    this.selectedBoardID = academicBoard.boardID;
    this.AcademicBoardForm.patchValue({
      boardName: academicBoard.boardName,
    });
    this.buttonLabel = 'Update';
    this.editedAcademicBoardID = academicBoard.boardID;
  }
  RemoveAcademicBoard(academicBoard: any) {
    if (!confirm('Are you sure you want to remove?')) {
      return;
    }
    this.schoolMaster
      .DeleteAcademicBoardByBoardID(academicBoard.boardID)
      .subscribe(
        (res) => {
          console.log('DeleteAcademicBoardByBoardID Response:');
          console.log(res);
          if (res === null || res === undefined) {
            alert('Something went wrong.');
          } else {
            // alert('Academic Board removed successfully.');
            this.fetchAllAcademicBoard();
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }
  ResetForm() {
    this.AcademicBoardForm.reset();
    this.selectedBoardID = 0;
    this.buttonLabel = 'Save';
    this.editedAcademicBoardID = 0;
  }
  HighlightSelectedRow(selectedBoardID: number) {
    this.selectedBoardID = selectedBoardID;
  }
  sortDirection: number = 1;
  sort(key: string) {
    if (this.allAcademicBoard) {
      this.sortDirection = this.sortDirection === 1 ? -1 : 1;
      this.allAcademicBoard = this.allAcademicBoard.sort(
        (a: { [x: string]: number }, b: { [x: string]: number }) => {
          if (a[key] < b[key]) return -1 * this.sortDirection;
          if (a[key] > b[key]) return 1 * this.sortDirection;
          return 0;
        }
      );
    }
  }
  get BoardName(): FormControl {
    return this.AcademicBoardForm.get('boardName') as FormControl;
  }
}
