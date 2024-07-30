export class AcademicProgramModel {
  programID!: number;
  boardID!: number;
  programName!: string | null;
  boardName!: string | null;
  programSeqNo!: number;
  isDeleted!: boolean;
  createdDateTime!: Date;
  createdBy!: number;
  updatedDateTime!: Date;
  updatedBy!: number;
}
