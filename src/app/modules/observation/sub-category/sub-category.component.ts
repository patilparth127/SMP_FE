import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { StudentObservationSubCategoryMasterModel, StudentObservationCategory } from '../../../interfaces/observation';
import { FormStateService } from '../../../comman/formstate.service';
import { ErrorHandlingDirective } from '../../../comman/error-handling.directive';
import { AlertService } from '../../../comman/alert.service';
import { ObservationService } from '../../../services/Observation/observation.service';
@Component({
  standalone : true,
  selector: 'app-sub-category',
  imports : [CommonModule,FormsModule,ErrorHandlingDirective],
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent {
  constructor(private observationService: ObservationService,  
    private alertService : AlertService,
    private formStateService: FormStateService) { }
  @ViewChild("subCategoryFormData") subCategoryFormData: NgForm | any;
  studentObservationSubCategory: StudentObservationSubCategoryMasterModel[] = [];
  studentObservationCategory : StudentObservationCategory[] = []
  newObservation: StudentObservationSubCategoryMasterModel = {
    studentObservationCategoryID: null,
    studentObservationSubCategoryID: 0,
    subCategory: "",
    isDelete: false,
    createdBy: "",
    createdDateTime: new Date(),
    updatedBy: "",
    updatedDateTime: new Date()
  };
  disable_data = false
  selectedObservation: StudentObservationSubCategoryMasterModel | null = null;
  studentObservationSubCategorydata : any 
  groupedStudentObservationSubCategory: any = [];
  subCategories: string[] = [];
  UpdatedSubCategories : any = []

  groupCategories(): void {
    const categoryMap = new Map<number, string>();
    this.studentObservationCategory.forEach(category => {
      categoryMap.set(category.studentObservationCategoryID, category.categoryText);
    });

    const grouped = this.studentObservationSubCategory.reduce((acc, current) => {
      const categoryName = categoryMap.get(current.studentObservationCategoryID) || 'Unknown Category';
      const category = acc.find(cat => cat.categoryName === categoryName);
      if (category) {
        category.subCategories.push(current);
      } else {
        acc.push({ categoryName: categoryName, subCategories: [current] });
      }
      return acc;
    }, [] as any[]);

    this.groupedStudentObservationSubCategory = grouped;
  }

  

  ngOnInit(): void {
    this.getAllStudentObservationCategory();
    this.getAllStudentObservationSubCategory()
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }

  getAllStudentObservationSubCategory(): void {
    this.observationService.getAllStudentObservationSubCategory().subscribe({
      next: (res) => {
        this.studentObservationSubCategory = res;
        this.groupCategories()

      },
      error: (err) => {
        console.error('Error fetching observations', err);
      }
    });
  }
  getAllStudentObservationCategory(): void {
    this.observationService.getallStudentObservationCategory().subscribe({
      next: (res) => {
        this.studentObservationCategory = res;
        this.groupCategories()

      },
      error: (err) => {
        console.error('Error fetching observations', err);
      }
    });
  }
 
  addSubCategory() {
    if (this.subCategoryFormData.form.invalid) {
      this.subCategoryFormData.form.markAllAsTouched();
      this.formStateService.markAllAsTouched();
      return;
    }
    if (this.newObservation.subCategory && this.newObservation.subCategory.trim()) {
      const newSubCategory: StudentObservationSubCategoryMasterModel = {
        ...this.newObservation,
      };

      this.UpdatedSubCategories.push(newSubCategory);
      //this.newObservation.subCategory = "";
      this.subCategoryFormData.form.reset()
    }
  }

  getSubCategoriesText(): string {
    return this.UpdatedSubCategories.map((item: { subCategory: any; }) => item.subCategory).join('\n');
  }
  selectObservation(observation: StudentObservationSubCategoryMasterModel): void {
    this.newObservation = { ...observation };
    this.selectedObservation = observation;
  }

  addOrUpdateSubCategory(): void {
    try{
      this.UpdatedSubCategories.forEach((observation: any) => {
        const payload: StudentObservationSubCategoryMasterModel = {
          studentObservationSubCategoryID: 0,
          studentObservationCategoryID: Number(observation.studentObservationCategoryID),
          subCategory: observation.subCategory,
          createdBy: 'admin',
          updatedBy: 'admin',
        };
  
        this.observationService.upsertStudentObservationSubCategory(payload).subscribe({
          next: (res) => {
            this.UpdatedSubCategories = []
            this.getAllStudentObservationSubCategory(); // Refresh list
            this.groupCategories()
            this.subCategoryFormData.form.reset()
            this.alertService.showToast( "Sub-Category Created Successfully");
          },
          error: (err) => {
            console.error('Error submitting observation', err);
          }
        });
        
      })
    }catch(err){
      console.log(err);
      
    }finally{


    }
  }
  UpdateSubCategory(){
    try{
        const payload: StudentObservationSubCategoryMasterModel = {
          studentObservationSubCategoryID: this.selectedObservation?.studentObservationSubCategoryID || 0,
          studentObservationCategoryID: Number(this.newObservation.studentObservationCategoryID),
          subCategory: this.newObservation.subCategory || '',
          createdBy: 'admin',
          updatedBy: 'admin',
        };
  
        this.observationService.upsertStudentObservationSubCategory(payload).subscribe({
          next: (res) => {
            this.getAllStudentObservationSubCategory(); // Refresh list
            this.groupCategories()
            this.groupedStudentObservationSubCategory = []
          },
          error: (err) => {
            console.error('Error submitting observation', err);
          }
        });
        
    }catch(err){
      console.log(err);
      
    }finally{
      this.subCategoryFormData.form.reset()
      this.alertService.showToast( "Sub-Category Updated Successfully");
      this.getAllStudentObservationSubCategory(); // Refresh list
      this.groupCategories()

    }
  }
  toggleCategory(group: any) {
    group.isExpanded = !group.isExpanded;
  }

    editObservation(observation: StudentObservationSubCategoryMasterModel): void {
    console.log(observation);
    
    this.newObservation = { ...observation };
    this.selectedObservation = observation;
    this.disable_data = true
  }
  resetForm(): void {
    // this.newObservation = {
    //   studentObservationCategoryID: 0,
    //   studentObservationSubCategoryID: 0,
    //   subCategory: "",
    //   isDelete: false,
    //   createdBy: "",
    //   createdDateTime:new Date(),
    //   updatedBy: "",
    //   updatedDateTime:new Date()
    // };

    this.disable_data = false
    this.selectedObservation = null;
    this.subCategories = [];
    this.getAllStudentObservationCategory();
    this.getAllStudentObservationSubCategory()
    this.subCategoryFormData.form.reset()
  }

  updateObservation(): void {
    if (this.selectedObservation) {
      this.addOrUpdateSubCategory();
    } else {
      console.log('No observation selected for update');
    }
  }
  removeSubCategory(index: number) {
    this.UpdatedSubCategories.splice(index, 1);
  }
  deleteObservation(observation: StudentObservationSubCategoryMasterModel): void {
    this.alertService
      .confirmBox(
        "Are you sure you want to delete this Observation  Sub-category?",
        "",
        "warning",
        true,
        "Yes, delete it",
        "Cancel"
      )
      .then((result) => {
        if (result.value) {
          this.observationService.deleteStudentObservationSubCategoryByID(observation.studentObservationSubCategoryID).subscribe({
            next: (res) => {
              this.alertService.showToast(
                'Observation Sub-category deleted successfully',
                'success'
              );
              this.getAllStudentObservationSubCategory(); // Refresh list
            },
            error: (err) => {
              this.alertService.showToast(
                'Error deleting Observation  Sub-category',
                'error'
              );
              console.error('Error deleting Observation  Sub-category', err);
            }
          });
        }
      });
  }
  
}
