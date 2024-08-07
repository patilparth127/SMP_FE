import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentObservationSubCategoryMasterModel, StudentObservationAttribute, StudentObservationCategory } from '../../../interfaces/observation';
import { ErrorHandlingDirective } from '../../../comman/error-handling.directive';
import { FormStateService } from '../../../comman/formstate.service';
import { AlertService } from '../../../comman/alert.service';
import { ObservationService } from '../../../services/Observation/observation.service';

@Component({
  standalone:true,
  selector: 'app-attributes',
  imports : [CommonModule,FormsModule,ErrorHandlingDirective],
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.css']
})
export class AttributesComponent implements OnInit{
  constructor(private observationService: ObservationService, private formStateService: FormStateService,
    private alertService : AlertService) { }
  
  @ViewChild("attributeFormData") attributeFormData: NgForm | any;

  studentObservationSubCategory: StudentObservationSubCategoryMasterModel[] = [];
  studentObservationSubCategoryRealData: StudentObservationSubCategoryMasterModel[] = [];
  studentObservationattribute: StudentObservationAttribute[] = [];
  studentObservationCategory : StudentObservationCategory[] = []
  newAttribute: StudentObservationAttribute = {
    studentObservationAttributeID: null,
    studentObservationCategoryID: null,
    studentObservationSubCategoryID: null,
    attribute: '',
    attributeValue: '',
    createdBy: '',
    updatedBy: '',
    isDelete: false,
    createdDateTime: '',
    updatedDateTime: null
  };
  disable_data = false
  selectedObservation: StudentObservationAttribute | any;
  studentObservationSubCategorydata : any 
  groupedStudentObservationSubCategory: any = [];
  subCategories: string[] = [];
  UpdatedSubCategories : any = []
  transformedData : any;
  isFieldDisabled : boolean = false
  groupCategories(): void {
    let data = this.mapNamesToAttributes(this.studentObservationattribute,this.studentObservationCategory,this.studentObservationSubCategory)
    console.log('data',data);
    this.transformedData = this.transformData(data);
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

  transformData(data: StudentObservationAttribute[]): Category[] {
    const groupedData: { [key: string]: Category } = {};
  
    data.forEach(item => {
      if (!groupedData[item.studentObservationCategoryName || 'Unknown']) {
        groupedData[item.studentObservationCategoryName || 'Unknown'] = {
          categoryName: item.studentObservationCategoryName || 'Unknown',
          subCategories: []
        };
      }
  
      const category = groupedData[item.studentObservationCategoryName || 'Unknown'];
  
      let subCategory = category.subCategories.find(
        sub => sub.subCategoryName === item.studentObservationSubCategoryName
      );
  
      if (!subCategory) {
        subCategory = {
          subCategoryName: item.studentObservationSubCategoryName || 'Unknown',
          attributes: []
        };
        category.subCategories.push(subCategory);
      }
  
      subCategory.attributes.push(item);
    });
  
    return Object.values(groupedData);
  }

  

      async ngOnInit(): Promise<void> {
       await this.getAllStudentObservationCategory();
       await this.getAllStudentSubObservationCategory();
       await this.getAllStudentObservationAttributes();
       window.scrollTo({ top: 0, behavior: 'smooth' });

      }
      onCategoryChange(event: any): void {
        this.studentObservationSubCategoryRealData  = this.studentObservationSubCategory.filter(x => x.studentObservationCategoryID ==event) || []
      }


  getAllStudentObservationAttributes(): void {
    this.observationService.getAllStudentObservationAttributes().subscribe({
      next: (res) => {
        this.studentObservationattribute = res
       
       this.groupCategories()
      },
      error: (err) => {
        console.error('Error fetching observations', err);
      }
    });
  }
  mapNamesToAttributes(
    attributes: StudentObservationAttribute[],
    categories: StudentObservationCategory[],
    subCategories: StudentObservationSubCategoryMasterModel[]
  ): StudentObservationAttribute[] {
    return attributes.map(attribute => {
      const category = categories.find(cat => cat.studentObservationCategoryID === attribute.studentObservationCategoryID);
      const subCategory = subCategories.find(sub => sub.studentObservationSubCategoryID === attribute.studentObservationSubCategoryID);
  
      return {
        ...attribute,
        studentObservationCategoryName: category ? category.categoryText : null,
        studentObservationSubCategoryName: subCategory ? subCategory.subCategory : null
      };
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
      this.updatedSubCategories.forEach((attr: any) => {
        const payload: any = {
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
            let message =  'Observation Attribute Created Successfully'
            this.alertService.showToast(message, 'success');
          this.isFieldDisabled=false
          this.updatedSubCategories = []
          this.getAllStudentObservationAttributes();
          this.resetForm()
          this.groupCategories()
          this.attributeFormData.form.reset()
          },
          error: (err) => {
            console.error('Error submitting observation', err);
          }
        });
        
      })
    }catch(err){
      console.log(err);
      
    }finally{
      //this.resetForm();
      this.attributeFormData.form.reset()
      this.isFieldDisabled=false
    }
  }
  UpdateSubCategory(){
    try{
        const payload: any = {
          studentObservationSubCategoryID: this.newAttribute?.studentObservationSubCategoryID,
          studentObservationCategoryID: Number(this.newAttribute.studentObservationCategoryID),
          studentObservationAttributeID: Number(this.selectedObservation?.studentObservationAttributeID),
          createdBy: 'admin',
          updatedBy: 'admin',
          attribute: this.newAttribute.attribute,
          attributeValue: this.newAttribute.attributeValue
        };
  
        this.observationService.upsertStudentObservationAttribute(payload).subscribe({
          next: (res) => {
            let message =   'Observation Attribute Updated Successfully'
            this.alertService.showToast(message, 'success');
            this.getAllStudentObservationAttributes(); // Refresh list
            this.groupCategories()
            this.attributeFormData.form.reset()
          },
          error: (err) => {
            console.error('Error submitting observation', err);
          }
        });
        
    }catch(err){
      console.log(err);
      
    }finally{
      this.getAllStudentObservationAttributes(); // Refresh list
      this.attributeFormData.form.reset()
      this.groupCategories()
      this.resetForm();
    }
  }
  updatedSubCategories : any = [];
  addAttribute() {
    if (this.attributeFormData.form.invalid) {
      this.attributeFormData.form.markAllAsTouched();
      this.formStateService.markAllAsTouched();
      return;
    }
  if (this.newAttribute.attribute && this.newAttribute.attributeValue) {
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
    this.clearField('attribute')
    this.clearField('attributeValue')
    this.isFieldDisabled=true
    // this.newAttribute.attribute = '';
    // this.newAttribute.attributeValue = '';
  }
}
clearField(fieldName: string) {
  if (this.attributeFormData) {
    const control = this.attributeFormData.controls[fieldName];
    if (control) {
      control.reset(); // Clear the field value
    }
  }
}
removeSubCategory(index: number) {
  this.updatedSubCategories.splice(index, 1);
}
  toggleCategory(group: any) {
    group.isExpanded = !group.isExpanded;
  }

    async editAttribute(observation: StudentObservationAttribute): Promise<void> {
    console.log(observation);
   await this.onCategoryChange(observation.studentObservationCategoryID)
    this.newAttribute = { ...observation };
    this.selectedObservation = observation;
    this.disable_data = true
  }
  resetForm(): void {
    // this.newAttribute = {
    //   studentObservationAttributeID: null,
    //   studentObservationCategoryID: null,
    //   studentObservationSubCategoryID: null,
    //   attribute: '',
    //   attributeValue: '',
    //   createdBy: '',
    //   updatedBy: '',
    //   isDelete: false,
    //   createdDateTime: '',
    //   updatedDateTime: null
    // };
    this.attributeFormData.form.reset()
    this.disable_data = false
    this.selectedObservation = null;
    this.subCategories = [];
    this.groupedStudentObservationSubCategory = []
    this.updatedSubCategories = []
    this.isFieldDisabled=false
  }

  updateObservation(): void {
    if (this.selectedObservation) {
      this.addOrUpdateSubCategory();
    } else {
      console.log('No observation selected for update');
    }
  }

  deleteAttribute(observation: StudentObservationAttribute): void {
    this.alertService.confirmBox(
      'Are you sure?',
      'You will not be able to recover this observation!',
      'warning',
      true,
      'Yes, delete it!',
      'Cancel'
    ).then((result) => {
      if (result.value) {
        this.observationService.DeleteStudentObservationAttributeByID(observation.studentObservationAttributeID).subscribe({
          next: (res) => {
            console.log('Observation deleted:', res);
            this.getAllStudentObservationAttributes(); // Refresh the list
            this.alertService.showToast('Your observation has been deleted.', 'success');
          },
          error: (err) => {
            console.error('Error deleting observation', err);
            this.alertService.showToast('There was a problem deleting the observation.', 'error');
          }
        });
      }
    });
  }
  


}
interface Category {
  categoryName: string;
  subCategories: SubCategory[];
}

interface SubCategory {
  subCategoryName: string;
  attributes: StudentObservationAttribute[];
}
