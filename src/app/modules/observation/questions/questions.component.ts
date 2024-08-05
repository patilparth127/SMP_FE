import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentObservationCategory, StudentObservationQuestionMasterModel, StudentQuestionObservation } from '../../../interfaces/observation';
import { ObservationService } from '../../../services/master/observation.service';

@Component({
  standalone:true,
  selector: 'app-questions',
  imports : [CommonModule,FormsModule],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {
  studentObservationCategory: StudentObservationCategory[] = [];
  studentObservationQuestionMasterModel: StudentObservationQuestionMasterModel[] = [];
  newObservation: StudentQuestionObservation = {
    StudentObservationQuestionID: null,
    StudentObservationCategoryID: 0,
    Question: '',
    QuestionSrNo: 0,
    QuestionDescription: '',
    IsQuestionCompulsory: false,
    CreatedBy: '',
    UpdatedBy: ''
  };
  disable_data = false;
  selectedObservation: StudentQuestionObservation | null = null;

  constructor(private observationService: ObservationService) { }

  ngOnInit(): void {
    this.getAllStudentObservationCategory();
    this.getAllStudentObservationQuestions();
    

  }
  mapCategoryText() {
    // Create a map from studentObservationCategory array for quick lookup
    const categoryMap = new Map<number, string>();
    
    this.studentObservationCategory.forEach(category => {
      categoryMap.set(category.studentObservationCategoryID, category.categoryText);
    });
console.log('studentObservationCategory',this.studentObservationCategory);

    // Map categoryText to studentObservationQuestionMasterModel
    this.studentObservationQuestionMasterModel = this.studentObservationQuestionMasterModel.map(question => {
      return {
        ...question,
        categoryText: categoryMap.get(question?.studentObservationCategoryID) || 'Unknown Category'
      };
    });
    console.log('studentObservationQuestionMasterModel',this.studentObservationQuestionMasterModel);
    
  }
  getAllStudentObservationCategory(): void {
    this.observationService.getallStudentObservationCategory().subscribe({
      next: (res) => {
        this.studentObservationCategory = res;
        this.mapCategoryText()
      },
      error: (err) => {
        console.error('Error fetching observations', err);
      }
    });
  }

  getAllStudentObservationQuestions(): void {
    this.observationService.getAllStudentObservationQuestions().subscribe({
      next: (res) => {
        this.studentObservationQuestionMasterModel = res;
        this.mapCategoryText()
      },
      error: (err) => {
        console.error('Error fetching observations', err);
      }
    });
  }

  selectObservation(observation: any): void {
    this.newObservation = { ...observation };
    this.selectedObservation = observation;
  }

  addOrUpdateQuestions(): void {
    try {
      const payload: StudentQuestionObservation = {
        StudentObservationQuestionID: null,
        StudentObservationCategoryID: this.newObservation.StudentObservationCategoryID,
        Question: this.newObservation.Question,
        QuestionSrNo: this.newObservation.QuestionSrNo,
        QuestionDescription: this.newObservation.QuestionDescription,
        IsQuestionCompulsory: Boolean(this.newObservation.IsQuestionCompulsory),
        CreatedBy: 'admin',
        UpdatedBy: 'admin'
      };
      this.observationService.upsertStudentObservationQuestion(payload).subscribe({
        next: (res) => { },
        error: (err) => {
          console.error('Error submitting observation', err);
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      this.resetForm();
    }
  }

  UpdateSubCategory() {
    try {
      const payload: StudentQuestionObservation = {
        StudentObservationQuestionID: this.selectedObservation?.StudentObservationQuestionID || null,
        StudentObservationCategoryID: this.newObservation.StudentObservationCategoryID,
        Question: this.newObservation.Question,
        QuestionSrNo: this.newObservation.QuestionSrNo,
        QuestionDescription: this.newObservation.QuestionDescription,
        IsQuestionCompulsory: Boolean(this.newObservation.IsQuestionCompulsory),
        CreatedBy: 'admin',
        UpdatedBy: 'admin'
      };
      this.observationService.upsertStudentObservationQuestion(payload).subscribe({
        next: (res) => {
          this.resetForm();
        },
        error: (err) => {
          console.error('Error submitting observation', err);
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      this.resetForm();
    }
  }
  editableopan : boolean =false
  editableopanupdate : boolean =false
  handleCheckboxChange(event: any, observation: StudentObservationQuestionMasterModel) {
    // Check if the checkbox is being checked
    if (event.target.checked) {
      // Uncheck all other checkboxes
      this.studentObservationQuestionMasterModel.forEach(item => {
        if (item !== observation) {
          item.isSelected = false;
        }
      });
  
      // Update the selected observation
      this.newObservation = {
        StudentObservationQuestionID: observation.studentObservationQuestionID,
        StudentObservationCategoryID: Number(observation.studentObservationCategoryID) || null,
        Question: observation.question,
        QuestionSrNo: observation.questionSrNo,
        QuestionDescription: observation.questionDescription,
        IsQuestionCompulsory: observation.isQuestionCompulsory,
        CreatedBy: 'admin',
        UpdatedBy: 'admin'
      };
      this.selectedObservation = this.newObservation;
      observation.isSelected = true; // Mark the current checkbox as selected
      this.disable_data = true;
      this.editableopan = true
      this.editableopanupdate = false
    } else {
      // If the checkbox is being unchecked, reset the selection
      observation.isSelected = false;
      this.newObservation = {
        StudentObservationQuestionID: null,
        StudentObservationCategoryID: 0,
        Question: '',
        QuestionSrNo: 0,
        QuestionDescription: '',
        IsQuestionCompulsory: false,
        CreatedBy: '',
        UpdatedBy: ''
      };
      this.selectedObservation = null;
      this.resetForm()
    }
  
    // Update form state

  }
  

  editObservation(): void {
    this.disable_data = true;
  }

  resetForm(): void {
    this.newObservation = {
      StudentObservationQuestionID: null,
      StudentObservationCategoryID: 0,
      Question: '',
      QuestionSrNo: 0,
      QuestionDescription: '',
      IsQuestionCompulsory: false,
      CreatedBy: '',
      UpdatedBy: ''
    };
    this.editableopan =false
    this.editableopanupdate =false
    this.disable_data = false;
    this.selectedObservation = null;
    this.getAllStudentObservationQuestions()
  }


  deleteObservation(): void {
    if (confirm('Are you sure you want to delete this observation?')) {
      if (this.selectedObservation) {
        this.observationService.deleteStudentObservationQuestionByID(this.selectedObservation.StudentObservationQuestionID).subscribe({
          next: (res) => {
            console.log('Observation deleted:', res);
     
            this.resetForm(); // Reset the form after deletion
          },
          error: (err) => {
            console.error('Error deleting observation:', err);
          }
        });
      } else {
        console.warn('No observation selected for deletion.');
      }
    }
  }
  
}
