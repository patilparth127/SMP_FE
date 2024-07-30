export class AcademicTermModel {
  termID!: number;
  academicYearID!: number;
  boardID!: number;
  programID!: number;
  termName!: string;
  fromDate!: Date;
  toDate!: Date;
  isDeleted!: boolean;
  createdDateTime!: Date;
  createdBy!: number;
  updatedDateTime!: Date;
  updatedBy!: number;
}
