export class AcademicBoardModel {
  boardID!: number;
  boardName!: string | null;
  isDeleted!: boolean;
  createdDateTime!: Date;
  createdBy!: number;
  updatedDateTime!: Date;
  updatedBy!: number;
}
