export interface StudentObservationCategory {
    studentObservationCategoryID: number;
    categoryText: string;
    showToParentnStudent: boolean;
    mailSendToHRT: boolean;
    isDelete: boolean;
    createdBy: string;
    updatedBy: string | null;
  }
  export interface StudentObservationSubCategoryMasterModel {
    studentObservationSubCategoryID: number;
    studentObservationCategoryID: number;
    subCategory: string;
    isDelete?: boolean;
    createdBy?: string;
    createdDateTime?: Date;
    updatedBy?: string;
    updatedDateTime?: Date;
}