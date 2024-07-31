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
export interface StudentObservationAttributeMasterModel {
  studentObservationAttributeID: number | null;
  studentObservationCategoryID: number | null;
  studentObservationSubCategoryID: number | null;
  attribute: string | null;
  attributeValue: number | null;
  isDelete: boolean | null;
  createdBy: string | null;
  createdDateTime: string | null;
  updatedBy: string | null;
  updatedDateTime: string | null;
}
export interface StudentObservationAttribute {
  studentObservationAttributeID: number | null;
  studentObservationCategoryID: number;
  studentObservationSubCategoryID: number;
  attribute: string;
  attributeValue: string;
  createdBy: string;
  updatedBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}
