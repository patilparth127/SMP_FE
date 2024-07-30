export interface SectionTeacherMasterModel {
  lstGradeSectionMaster: GradeSectionModel[];
  lstTeacher: TeacherModel[];
}

export interface GradeSectionModel {
  sectionTeacherMasterID: number;
  gradeID: number;
  sectionID: number;
  sectionName: string;
  gradeName: string;
  teacherID: number;
}

export interface TeacherModel {
  teacherID: number;
  teacherName: string;
}

export class SectionTeacherViewModel {
  sectionTeacherMasterID!: number;
  gradeID!: number;
  sectionID!: number;
  teacherID!: number;
  gradeName!: string;
  sectionName!: string;
  teacherName!: string;
  createdDateTime!: Date;
  createdBy!: string;
  updatedDateTime?: Date;
  updatedBy!: string;
}