import { Component, OnInit, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { StudentObservationCategory } from '../../../interfaces/observation';
import { AlertService } from '../../../comman/alert.service';
import { FormStateService } from '../../../comman/formstate.service';
import { ErrorHandlingDirective } from '../../../comman/error-handling.directive';
import { ObservationService } from '../../../services/Observation/observation.service';


@Component({
  standalone : true,
  imports : [CommonModule,FormsModule,ErrorHandlingDirective],
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  studentObservationCategory: StudentObservationCategory[] = [];
  @ViewChild("formdata") formdata: NgForm | any;
  newObservation: StudentObservationCategory = {
    studentObservationCategoryID: 0,
    categoryText: null,
    showToParentnStudent: false,
    mailSendToHRT: true,
    isDelete: false,
    createdBy: '1',
    updatedBy: null
  };

  selectedObservation: StudentObservationCategory | null = null;

  constructor(private observationService: ObservationService,
    private formStateService: FormStateService,
    private alertService : AlertService) { }

  ngOnInit(): void {
    this.getAllObservations();
    window.scrollTo({ top: 0, behavior: 'smooth' });

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
    if (this.formdata.form.invalid) {
      this.formdata.form.markAllAsTouched();
      this.formStateService.markAllAsTouched();
      return;
    }

    const observation: StudentObservationCategory = { ...this.newObservation };
    observation.showToParentnStudent = (observation.showToParentnStudent == null || observation.showToParentnStudent == undefined ||  observation.showToParentnStudent == false) ? false : true
    this.observationService.InsertNUpdateStudentObservationCategory(observation).subscribe({
      next: (res) => {
       let message =  this.selectedObservation == null ? 'Observation Created Successfully' : 'Observation Updated Successfully'
       this.alertService.showToast(message, 'success');
        this.getAllObservations();
        this.formdata.reset()
        //this.resetForm();
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
    // this.newObservation = {
    //   studentObservationCategoryID: 0,
    //   categoryText: null,
    //   showToParentnStudent: false,
    //   mailSendToHRT: true,
    //   isDelete: false,
    //   createdBy: '1',
    //   updatedBy: null
    // };
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
    this.alertService
      .confirmBox(
        "Are you sure you want to delete this observation Category?",
        "",
        "warning",
        true,
        "Yes, delete it",
        "Cancel"
      )
      .then(async (result) => {
        if (result.value) {
          const response: any = await this.observationService
            .deleteStudentObservationCategory(observation.studentObservationCategoryID)
            .toPromise();
  
          if (response) {
            this.alertService.showToast(
              'Observation Category deleted successfully',
              'success'
            );
            this.getAllObservations(); // Refresh list
          } else {
            this.alertService.showToast(
              'Error deleting observation Category',
              'error'
            );
          }
        }
      });
  }

}

