import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { StudentObservationCategory, StudentObservationQuestionMasterModel, StudentQuestionObservation } from '../../../interfaces/observation';
import { ErrorHandlingDirective } from '../../../comman/error-handling.directive';
import { AlertService } from '../../../comman/alert.service';
import { FormStateService } from '../../../comman/formstate.service';
import { ObservationService } from '../../../services/Observation/observation.service';

@Component({
  standalone:true,
  selector: 'app-questions',
  imports : [CommonModule,FormsModule,ErrorHandlingDirective],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {
  studentObservationCategory: StudentObservationCategory[] = [];
  studentObservationQuestionMasterModel: StudentObservationQuestionMasterModel[] = [];
  newObservation: StudentQuestionObservation = {
    StudentObservationQuestionID: null,
    StudentObservationCategoryID: null,
    Question: '',
    QuestionSrNo: null,
    QuestionDescription: '',
    IsQuestionCompulsory: null,
    CreatedBy: '',
    UpdatedBy: ''
  };
  @ViewChild("questionsForm") questionsForm: NgForm | any;
  disable_data = false;
  selectedObservation: StudentQuestionObservation | null = null;

  constructor(private observationService: ObservationService,private alertService : AlertService,
    private formStateService: FormStateService) { }

  ngOnInit(): void {
    this.getAllStudentObservationCategory();
    this.getAllStudentObservationQuestions();
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      if (this.questionsForm.form.invalid) {
        this.questionsForm.form.markAllAsTouched();
        this.formStateService.markAllAsTouched();
        return;
      }
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
        next: (res) => {
          this.getAllStudentObservationQuestions();
          this.alertService.showToast( "observation Question Created Successfully");
          this.questionsForm.form.reset()
         },
        error: (err) => {
          console.error('Error submitting observation', err);
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      this.resetForm();
      this.questionsForm.form.reset()
    }
  }

  UpdateSubCategory() {
    try {
      if (this.questionsForm.form.invalid) {
        this.questionsForm.form.markAllAsTouched();
        this.formStateService.markAllAsTouched();
        return;
      }
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
          this.getAllStudentObservationQuestions();
          this.alertService.showToast( "observation Question Updated Successfully");
          this.questionsForm.form.reset()
        },
        error: (err) => {
          console.error('Error submitting observation', err);
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      this.resetForm();
      this.questionsForm.form.reset()
    }
  }
  editableopan : boolean =false
  editableopanupdate : boolean =false
  handleCheckboxChange(event: any, observation: StudentObservationQuestionMasterModel) {
    if (event.target.checked) {
      this.studentObservationQuestionMasterModel.forEach(item => {
        if (item !== observation) {
          item.isSelected = false;
        }
      });
  
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
      observation.isSelected = true;
      this.disable_data = true;
      this.editableopan = true
      this.editableopanupdate = false
    } else {
      observation.isSelected = false;
      this.newObservation = {
        StudentObservationQuestionID: null,
        StudentObservationCategoryID: null,
        Question: '',
        QuestionSrNo: null,
        QuestionDescription: '',
        IsQuestionCompulsory: null,
        CreatedBy: '',
        UpdatedBy: ''
      };
      this.selectedObservation = null;
      this.resetForm()
    }
  

  }
  

  editObservation(): void {
    this.disable_data = true;
  }

  resetForm(): void {

    // this.newObservation = {
    //   StudentObservationQuestionID: null,
    //   StudentObservationCategoryID: null,
    //   Question: '',
    //   QuestionSrNo: null,
    //   QuestionDescription: '',
    //   IsQuestionCompulsory: false,
    //   CreatedBy: '',
    //   UpdatedBy: ''
    // };
    this.editableopan =false
    this.editableopanupdate =false
    this.disable_data = false;
    this.selectedObservation = null;
    this.getAllStudentObservationQuestions()
    this.questionsForm.form.reset()
  }

  deleteObservation(): void {
    this.alertService.confirmBox(
      'Are you sure?',
      'You will not be able to recover this observation Question!',
      'warning',
      true,
      'Yes, delete it!',
      'Cancel'
    ).then((result) => {
      if (result.value) {
        if (this.selectedObservation) {
          this.observationService.deleteStudentObservationQuestionByID(this.selectedObservation.StudentObservationQuestionID).subscribe({
            next: (res) => {
              console.log('Observation Question deleted:', res);
              this.resetForm(); // Reset the form after deletion
              this.alertService.showToast('Observation Question successfully deleted.', 'success');
              this.questionsForm.form.reset()
            },
            error: (err) => {
              console.error('Error deleting observation Question:', err);
              this.alertService.showToast('Error deleting observation Question.', 'error');
            }
          });
        } else {
          console.warn('No observation Question selected for deletion.');
          this.alertService.showToast('No observation Question selected for deletion.', 'warning');
        }
      }
    });
  }
  
  
}
