import { Component } from '@angular/core';
import { StudentObservationCategory, StudentObservationSubCategoryMasterModel } from '../../../../interfaces/observation';
import { ObservationService } from '../../../../services/master/observation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone : true,
  selector: 'app-sub-category',
  imports : [CommonModule,FormsModule],
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent {
  constructor(private observationService: ObservationService) { }

  studentObservationSubCategory: StudentObservationSubCategoryMasterModel[] = [];
  studentObservationCategory : StudentObservationCategory[] = []
  newObservation: StudentObservationSubCategoryMasterModel = {
    studentObservationCategoryID: 0,
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
    if (this.newObservation.subCategory && this.newObservation.subCategory.trim()) {
      const newSubCategory: StudentObservationSubCategoryMasterModel = {
        ...this.newObservation,
      };

      this.UpdatedSubCategories.push(newSubCategory);
      this.newObservation.subCategory = "";
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
          },
          error: (err) => {
            console.error('Error submitting observation', err);
          }
        });
        
      })
    }catch(err){
      console.log(err);
      
    }finally{
      this.resetForm();
      this.getAllStudentObservationSubCategory(); // Refresh list
      this.groupCategories()
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
            this.resetForm();
            this.getAllStudentObservationSubCategory(); // Refresh list
            this.groupCategories()
          },
          error: (err) => {
            console.error('Error submitting observation', err);
          }
        });
        
    }catch(err){
      console.log(err);
      
    }finally{
      this.getAllStudentObservationSubCategory(); // Refresh list
      this.groupCategories()
      this.resetForm();
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
    this.newObservation = {
      studentObservationCategoryID: 0,
      studentObservationSubCategoryID: 0,
      subCategory: "",
      isDelete: false,
      createdBy: "",
      createdDateTime:new Date(),
      updatedBy: "",
      updatedDateTime:new Date()
    };
    this.disable_data = false
    this.selectedObservation = null;
    this.subCategories = [];
    this.groupedStudentObservationSubCategory = []
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
    if (confirm('Are you sure you want to delete this observation?')) {
      debugger
      this.observationService.deleteStudentObservationSubCategoryByID(observation.studentObservationSubCategoryID).subscribe({
        next: (res) => {
          console.log('Observation deleted:', res);
          this.getAllStudentObservationSubCategory(); // Refresh list
        },
        error: (err) => {
          console.error('Error deleting observation', err);
        }
      });
    }
  }
}
