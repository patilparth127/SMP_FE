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
  studentObservationAttributeID?: number|null;
  studentObservationCategoryID: number;
  studentObservationCategoryName?: string | null;
  studentObservationSubCategoryID: number;
  studentObservationSubCategoryName?: string | null;
  attribute: string;
  attributeValue: string;
  isDelete: boolean;
  createdBy: string;
  createdDateTime: string;
  updatedBy: string | null;
  updatedDateTime: string | null;
}

export interface StudentObservationQuestionMasterModel {
  isSelected? : boolean
  categoryText? : string
  studentObservationQuestionID: number | null;
  studentObservationCategoryID: number;
  question: string | null;
  questionSrNo: number | null;
  questionDescription: string | null;
  isQuestionCompulsory: boolean | null;
  isDelete: boolean | null;
  createdBy: string | null;
  createdDateTime: Date | null;
  updatedBy: string | null;
  updatedDateTime: Date | null;
}
export interface StudentQuestionObservation {
  StudentObservationQuestionID: number | null;
  StudentObservationCategoryID: number | null;
  Question: string | null;
  QuestionSrNo: number | null;
  QuestionDescription: string | null;
  IsQuestionCompulsory: boolean | null;
  CreatedBy: string;
  UpdatedBy: string;
}
