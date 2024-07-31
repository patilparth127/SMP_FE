import { Component } from '@angular/core';
import { ObservationService } from '../../../../services/master/observation.service';
import { StudentObservationSubCategoryMasterModel, StudentObservationCategory, StudentObservationAttributeMasterModel, StudentObservationAttribute } from '../../../../interfaces/observation';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone:true,
  selector: 'app-attributes',
  imports : [CommonModule,FormsModule],
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.css']
})
export class AttributesComponent {
  constructor(private observationService: ObservationService) { }

  studentObservationSubCategory: StudentObservationSubCategoryMasterModel[] = [];
  studentObservationSubCategoryRealData: StudentObservationSubCategoryMasterModel[] = [];
  studentObservationCategory : StudentObservationCategory[] = []
  newAttribute: StudentObservationAttribute = {
    studentObservationAttributeID: null,
    studentObservationCategoryID: 0,
    studentObservationSubCategoryID: 0,
    attribute: '',
    attributeValue: '',
    createdBy: '',
    updatedBy: ''
  };
  disable_data = false
  selectedObservation: StudentObservationAttribute | any;
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
        this.getAllStudentSubObservationCategory();
        this.getAllStudentObservationAttributes();
      }
      onCategoryChange(event: any): void {
        this.studentObservationSubCategoryRealData  = this.studentObservationSubCategory.filter(x => x.studentObservationCategoryID ==event) || []
      }


  getAllStudentObservationAttributes(): void {
    this.observationService.getAllStudentObservationAttributes().subscribe({
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
   getAllStudentSubObservationCategory(): void {
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
  addSubCategory() {
    if (this.newAttribute.attribute && this.newAttribute.attribute.trim()) {
      const newSubCategory: StudentObservationAttribute = {
        ...this.newAttribute,
      };

      this.UpdatedSubCategories.push(newSubCategory);
      this.newAttribute.attribute = "";
    }
  }

  getSubCategoriesText(): string {
    return this.UpdatedSubCategories.map((item: { subCategory: any; }) => item.subCategory).join('\n');
  }
  selectObservation(observation: StudentObservationAttribute): void {
    this.newAttribute = { ...observation };
    this.selectedObservation = observation;
  }

  addOrUpdateSubCategory(): void {
    try{
      debugger
      this.updatedSubCategories.forEach((attr: any) => {
        const payload: StudentObservationAttribute = {
          studentObservationSubCategoryID:  Number(attr.studentObservationSubCategoryID),
          studentObservationCategoryID: Number(attr.studentObservationCategoryID),
          studentObservationAttributeID: null,
          createdBy: 'admin',
          updatedBy: 'admin',
          attribute: attr.attribute,
          attributeValue: String(attr.attributeValue)
        };
  
        this.observationService.upsertStudentObservationAttribute(payload).subscribe({
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
      this.getAllStudentObservationAttributes(); // Refresh list
      this.groupCategories()
    }
  }
  UpdateSubCategory(){
    try{
        const payload: StudentObservationAttribute = {
          studentObservationSubCategoryID: this.newAttribute?.studentObservationSubCategoryID,
          studentObservationCategoryID: Number(this.newAttribute.studentObservationCategoryID),
          studentObservationAttributeID: Number(this.selectedObservation?.studentObservationAttributeID),
          createdBy: 'admin',
          updatedBy: 'admin',
          attribute: '',
          attributeValue: this.newAttribute.attribute
        };
  
        this.observationService.upsertStudentObservationAttribute(payload).subscribe({
          next: (res) => {
            this.resetForm();
            this.getAllStudentObservationAttributes(); // Refresh list
            this.groupCategories()
          },
          error: (err) => {
            console.error('Error submitting observation', err);
          }
        });
        
    }catch(err){
      console.log(err);
      
    }finally{
      this.getAllStudentObservationAttributes(); // Refresh list
      this.groupCategories()
      this.resetForm();
    }
  }
  updatedSubCategories : any = [];
  addAttribute() {
  if (this.newAttribute.attribute && this.newAttribute.attributeValue) {
    debugger
    console.log(this.newAttribute);
    this.updatedSubCategories.push({
      studentObservationAttributeID: null,
      studentObservationCategoryID: this.newAttribute.studentObservationCategoryID,
      studentObservationSubCategoryID: this.newAttribute.studentObservationSubCategoryID,
      attribute: this.newAttribute.attribute,
      attributeValue: this.newAttribute.attributeValue,
      createdBy: '',
      updatedBy: ''
    });
 
    this.newAttribute.attribute = '';
    this.newAttribute.attributeValue = '';
  }
}

removeSubCategory(index: number) {
  this.updatedSubCategories.splice(index, 1);
}
  toggleCategory(group: any) {
    group.isExpanded = !group.isExpanded;
  }

    editObservation(observation: StudentObservationAttribute): void {
    console.log(observation);
    
    this.newAttribute = { ...observation };
    this.selectedObservation = observation;
    this.disable_data = true
  }
  resetForm(): void {
    this.newAttribute = {
      studentObservationAttributeID: null,
      studentObservationCategoryID: 0,
      studentObservationSubCategoryID: 0,
      attribute: '',
      attributeValue: '',
      createdBy: '',
      updatedBy: ''
    };
    this.disable_data = false
    this.selectedObservation = null;
    this.subCategories = [];
    this.groupedStudentObservationSubCategory = []
    this.updatedSubCategories = []
  }

  updateObservation(): void {
    if (this.selectedObservation) {
      this.addOrUpdateSubCategory();
    } else {
      console.log('No observation selected for update');
    }
  }

  deleteObservation(observation: StudentObservationAttribute): void {
    if (confirm('Are you sure you want to delete this observation?')) {
      debugger
      this.observationService.DeleteStudentObservationAttributeByID(observation.studentObservationAttributeID).subscribe({
        next: (res) => {
          console.log('Observation deleted:', res);
          this.getAllStudentObservationAttributes();
        },
        error: (err) => {
          console.error('Error deleting observation', err);
        }
      });
    }
  }
}
