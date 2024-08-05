import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentObservationCategory } from '../../../interfaces/observation';
import { ObservationService } from '../../../services/master/observation.service';


@Component({
  standalone : true,
  imports : [CommonModule,FormsModule],
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  studentObservationCategory: StudentObservationCategory[] = [];
  newObservation: StudentObservationCategory = {
    studentObservationCategoryID: 0,
    categoryText: '',
    showToParentnStudent: false,
    mailSendToHRT: true,
    isDelete: false,
    createdBy: '1',
    updatedBy: null
  };

  selectedObservation: StudentObservationCategory | null = null;

  constructor(private observationService: ObservationService) { }

  ngOnInit(): void {
    this.getAllObservations();
  }

  getAllObservations(): void {
    this.observationService.getallStudentObservationCategory().subscribe({
      next: (res) => {
        this.studentObservationCategory = res;
      },
      error: (err) => {
        console.error('Error fetching observations', err);
      }
    });
  }

  selectObservation(observation: StudentObservationCategory): void {
    this.newObservation = { ...observation };
    this.selectedObservation = observation;
  }

  addOrUpdateObservation(): void {
if(this.newObservation.categoryText == "" ||this.newObservation.categoryText == null || this.newObservation.categoryText == undefined ){
  //this.toastr.warning('All fields are mandatory', 'Error');
 
  return
}
    const observation: StudentObservationCategory = { ...this.newObservation };

    this.observationService.InsertNUpdateStudentObservationCategory(observation).subscribe({
      next: (res) => {
       // this.toastr.success('Observation Created', 'Successfully');
        this.getAllObservations(); // Refresh list
        this.resetForm(); // Reset form after submission
      },
      error: (err) => {
        console.error('Error submitting observation', err);
      }
    });
  }
  editObservation(observation: StudentObservationCategory): void {
    this.newObservation = { ...observation };
    this.selectedObservation = observation;
  }
  resetForm(): void {
    this.newObservation = {
      studentObservationCategoryID: 0,
      categoryText: '',
      showToParentnStudent: false,
      mailSendToHRT: true,
      isDelete: false,
      createdBy: '1',
      updatedBy: null
    };
    this.selectedObservation = null;
  }

  updateObservation(): void {
    if (this.selectedObservation) {
      this.addOrUpdateObservation();
    } else {
      console.log('No observation selected for update');
    }
  }

  deleteObservation(observation: StudentObservationCategory): void {
    if (confirm('Are you sure you want to delete this observation?')) {
      this.observationService.deleteStudentObservationCategory(observation.studentObservationCategoryID).subscribe({
        next: (res) => {
          console.log('Observation deleted:', res);
          this.getAllObservations(); // Refresh list
        },
        error: (err) => {
          console.error('Error deleting observation', err);
        }
      });
    }
  }

}

