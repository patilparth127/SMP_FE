export interface StudentObservationCategory {
    studentObservationCategoryID: number;
    categoryText: string;
    showToParentnStudent: boolean;
    mailSendToHRT: boolean;
    isDelete: boolean;
    createdBy: string;
    updatedBy: string | null;
  }
  