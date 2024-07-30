import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIUrlConstants } from '../../api-endpoints.constants';
import { OrganizationDepartmentModel } from '../../models/school-master/organizational-master/organization-department.model';
import { AcademicBoardModel } from '../../models/school-master/academic-master/academic-board.model';
import { AcademicProgramModel } from '../../models/school-master/academic-master/academic-program.model';
import { AcademicTermModel } from '../../models/school-master/academic-master/academic-term.model';
import { GradeModel } from '../../models/school-master/academic-master/grade.model';
import { SectionModel } from '../../models/school-master/academic-master/section.model';
import { OrganizationGroupModel } from '../../models/school-master/organizational-master/organization-group.model';
import { AcademicYearModel } from '../../models/school-master/academic-master/academic-year.model';
import { OrganizationTeamModel } from '../../models/school-master/organizational-master/organization-team.model';
import { StaffDesignationMasterModel } from '../../models/school-master/organizational-master/staff-designation-master.model';
import { SectionTeacherMasterModel, SectionTeacherViewModel } from '../../models/school-master/section-teacher-master/section-teacher-master.model';
import { SectionStudentMasterModel } from '../../models/school-master/section-student-master/section-student-master.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class SchoolMasterService {
  constructor(private http: HttpClient) { }
  // Region: Academic Year
  GetAllAcademicYear() {
    const url = APIUrlConstants.GetAllAcademicYear;
    console.log('URL: ' + url);
    const params = {};
    console.log('Params: ' + JSON.stringify(params));
    return this.http.get<any[]>(url, { params });
  }
  InsertNUpdateAcademicYear(objAcademicYearModel: AcademicYearModel) {
    const url = APIUrlConstants.InsertNUpdateAcademicYear;
    console.log('URL: ' + url);
    console.log('Params: ' + JSON.stringify(objAcademicYearModel));
    return this.http.post<any[]>(url, objAcademicYearModel);
  }
  DeleteAcademicYearByAcademicYearID(AcademicYearID: number) {
    const url = APIUrlConstants.DeleteAcademicYearByAcademicYearID;
    console.log('URL: ' + url);
    const params = { AcademicYearID: AcademicYearID };
    console.log('Params: ' + JSON.stringify(params));
    return this.http.delete<any[]>(url, { params });
  }
  GetAcademicYearByAcademicYearID(AcademicYearID: number) {
    const url = APIUrlConstants.GetAcademicYearByAcademicYearID;
    console.log('URL: ' + url);
    const params = { AcademicYearID: AcademicYearID };
    console.log('Params: ' + JSON.stringify(params));
    return this.http.get<any[]>(url, { params });
  }
  // End Region: Academic Year

  // Region: Academic Board
  GetAllAcademicBoard() {
    const url = APIUrlConstants.GetallBoardList;
    console.log('URL: ' + url);
    const params = {};
    console.log('Params: ' + JSON.stringify(params));
    return this.http.get<any[]>(url, { params });
  }
  UpsertAcademicBoard(academicBoardModel: AcademicBoardModel) {
    const url = APIUrlConstants.InsertNUpdateBoardMaster;
    console.log('URL: ' + url);
    console.log('Params: ' + JSON.stringify(academicBoardModel));
    return this.http.post<any[]>(url, academicBoardModel);
  }
  DeleteAcademicBoardByBoardID(boardID: number) {
    const url = APIUrlConstants.DeleteBoardMasterByBoardID;
    console.log('URL: ' + url);
    const params = { BoardID: boardID };
    console.log('Params: ' + JSON.stringify(params));
    return this.http.delete<any[]>(url, { params });
  }
  // End Region: Academic Board

  // Region: Academic Program
  GetAllAcademicProgram() {
    const url = APIUrlConstants.GetallPrograms;
    console.log('URL: ' + url);
    const params = {};
    console.log('Params: ' + JSON.stringify(params));
    return this.http.get<any[]>(url, { params });
  }
  GetAllProgramByBoardID(boardID: number) {
    const url = APIUrlConstants.GetAllProgramByBoardID;
    console.log('URL: ' + url);
    const params = { BoardID: boardID };
    console.log('Params: ' + JSON.stringify(params));
    return this.http.get<any[]>(url, { params });
  }
  UpsertAcademicProgram(academicProgramModel: AcademicProgramModel) {
    const url = APIUrlConstants.InsertNUpdateProgram;
    console.log('URL: ' + url);
    console.log('Params: ' + JSON.stringify(academicProgramModel));
    return this.http.post<any[]>(url, academicProgramModel);
  }
  DeleteProgramByProgramID(ProgramID: number) {
    const url = APIUrlConstants.DeleteProgramByProgramID;
    console.log('URL: ' + url);
    const params = { ProgramID: ProgramID };
    console.log('Params: ' + JSON.stringify(params));
    return this.http.delete<any[]>(url, { params });
  }
  // End Region: Academic Program

  // Region: Academic Term
  GetallTermByAYIDNBoard(academicYearID: number, boardID: number) {
    const url = APIUrlConstants.GetallTermByAYIDNBoard;
    console.log('URL: ' + url);
    const params = { AcademicYearID: academicYearID, BoardID: boardID };
    console.log('Params: ' + JSON.stringify(params));
    return this.http.get<any[]>(url, { params });
  }
  GetAcademicTermByTermID() {
    const url = APIUrlConstants.GetAcademicTermByTermID;
    console.log('URL: ' + url);
    const params = {};
    console.log('Params: ' + JSON.stringify(params));
    return this.http.get<any[]>(url, { params });
  }
  UpsertAcademicTerm(academicTermModel: AcademicTermModel) {
    const url = APIUrlConstants.InsertNUpdateAcademicTerm;
    console.log('URL: ' + url);
    console.log('Params: ' + JSON.stringify(academicTermModel));
    return this.http.post<any[]>(url, academicTermModel);
  }
  DeleteTermByTermID(termID: number) {
    const url = APIUrlConstants.DeleteAcademicTermByTermID;
    console.log('URL: ' + url);
    const params = { TermID: termID };
    console.log('Params: ' + JSON.stringify(params));
    return this.http.delete<any[]>(url, { params });
  }
  // End Region: Academic Term

  // Region: Grade
  UpsertGrade(objGrade: GradeModel) {
    const url = APIUrlConstants.InsertNUpdateGrade;
    console.log('URL: ' + url);
    console.log('Params: ' + JSON.stringify(objGrade));
    return this.http.post<any[]>(url, objGrade);
  }
  GetAllGradeByProgramID(programID: number) {
    const url = APIUrlConstants.GetAllGradeByProgramID;
    console.log('URL: ' + url);
    const params = { ProgramID: programID };
    console.log('Params: ' + JSON.stringify(params));
    return this.http.get<any[]>(url, { params });
  }
  GetAllGradeByAcademicYearIDNBoardID(academicYearID: number, boardID: number) {
    const url = APIUrlConstants.GetAllGradeByAcademicYearIDNBoardID;
    console.log('URL: ' + url);
    const params = { AcademicYearID: academicYearID, BoardID: boardID };
    console.log('Params: ' + JSON.stringify(params));
    return this.http.get<any[]>(url, { params });
  }
  DeleteGradeByGradeID(gradeID: number) {
    const url = APIUrlConstants.DeleteGradeByGradeID;
    console.log('URL: ' + url);
    const params = { GradeID: gradeID };
    console.log('Params: ' + JSON.stringify(params));
    return this.http.delete<any[]>(url, { params });
  }
  // End Region: Grade

  // Region: Section
  GetSectionBySectionID(sectionID: number) {
    const url = APIUrlConstants.GetSectionBySectionID;
    console.log('URL: ' + url);
    const params = { SectionID: sectionID };
    console.log('Params: ' + JSON.stringify(params));
    return this.http.get<any[]>(url, { params });
  }
  GetAllSectionByGradeID(gradeID: number) {
    const url = APIUrlConstants.GetAllSectionByGradeID;
    console.log('URL: ' + url);
    const params = { GradeID: gradeID };
    console.log('Params: ' + JSON.stringify(params));
    return this.http.get<any[]>(url, { params });
  }
  GetAllSectionByAcademicYearIDNProgramID(
    academicYearID: number,
    programID: number
  ) {
    const url = APIUrlConstants.GetAllSectionByAcademicYearIDNProgramID;
    console.log('URL: ' + url);
    const params = { AcademicYearID: academicYearID, ProgramID: programID };
    console.log('Params: ' + JSON.stringify(params));
    return this.http.get<any[]>(url, { params });
  }
  DeleteSectionBySectionID(sectionID: number) {
    const url = APIUrlConstants.DeleteSectionBySectionID;
    console.log('URL: ' + url);
    const params = { SectionID: sectionID };
    console.log('Params: ' + JSON.stringify(params));
    return this.http.delete<any[]>(url, { params });
  }
  UpsertSection(objSection: SectionModel) {
    const url = APIUrlConstants.InsertNUpdateSection;
    console.log('URL: ' + url);
    console.log('Params: ' + JSON.stringify(objSection));
    return this.http.post<any[]>(url, objSection);
  }
  // End Region: Section

  // Region: Organization Group
  GetAllOrganizationGroup() {
    const url = APIUrlConstants.GetAllOrganizationGroup;
    console.log('URL: ' + url);
    return this.http.get<any[]>(url);
  }
  UpsertOrganizationGroup(objOrganizationGroupModel: OrganizationGroupModel) {
    const url = APIUrlConstants.UpsertOrganizationGroup;
    console.log('URL: ' + url);
    console.log('Params: ' + JSON.stringify(objOrganizationGroupModel));
    return this.http.post<any[]>(url, objOrganizationGroupModel);
  }
  DeleteOrganizationGroup(OrganizationGroupID: number) {
    const url = APIUrlConstants.DeleteOrganizationGroup;
    console.log('URL: ' + url);
    const params = { OrganizationGroupID: OrganizationGroupID };
    console.log('Params: ' + JSON.stringify(params));
    return this.http.delete<any[]>(url, { params });
  }
  // End Region: Organization Group

  // Region: Organization Department
  GetAllOrganizationDepartment() {
    const url = APIUrlConstants.GetAllOrganizationDepartment;
    console.log('URL: ' + url);
    return this.http.get<any[]>(url);
  }
  UpsertOrganizationDepartment(
    objOrganizationDepartmentModel: OrganizationDepartmentModel
  ) {
    const url = APIUrlConstants.UpsertOrganizationDepartment;
    console.log('URL: ' + url);
    console.log('Params: ' + JSON.stringify(objOrganizationDepartmentModel));
    return this.http.post<any[]>(url, objOrganizationDepartmentModel);
  }
  DeleteOrganizationDepartment(organizationDepartmentID: number) {
    const url = APIUrlConstants.DeleteOrganizationDepartment;
    console.log('URL: ' + url);
    const params = { OrganizationDepartmentID: organizationDepartmentID };
    console.log('Params: ' + JSON.stringify(params));
    return this.http.delete<any[]>(url, { params });
  }
  // End Region: Organization Department

  // Region: Organization Team
  GetAllOrganizationTeam() {
    const url = APIUrlConstants.GetAllOrganizationTeam;
    console.log('URL: ' + url);
    return this.http.get<any[]>(url);
  }
  UpsertOrganizationTeam(objOrganizationTeamModel: OrganizationTeamModel) {
    const url = APIUrlConstants.UpsertOrganizationTeam;
    console.log('URL: ' + url);
    console.log('Params: ' + JSON.stringify(objOrganizationTeamModel));
    return this.http.post<any[]>(url, objOrganizationTeamModel);
  }
  DeleteOrganizationTeam(organizationTeamID: number, updatedBy: string) {
    const url = APIUrlConstants.DeleteOrganizationTeam;
    console.log('URL: ' + url);
    const params = { OrganizationTeamID: organizationTeamID, UpdatedBy: updatedBy || '' };
    console.log('Params: ' + JSON.stringify(params));
    return this.http.delete<any[]>(url, { params });
  }
  // End Region: Organization Team

  // Region: Staff Designation Master
  GetAllStaffDesignationMaster() {
    const url = APIUrlConstants.GetAllStaffDesignationMaster;
    console.log('URL: ' + url);
    return this.http.get<any[]>(url);
  }
  UpsertStaffDesignationMaster(objStaffDesignationMasterModel: StaffDesignationMasterModel) {
    const url = APIUrlConstants.UpsertStaffDesignationMaster;
    console.log('URL: ' + url);
    console.log('Params: ' + JSON.stringify(objStaffDesignationMasterModel));
    return this.http.post<any[]>(url, objStaffDesignationMasterModel);
  }
  DeleteStaffDesignationMaster(staffDesignationMasterID: number, updatedBy: string) {
    const url = APIUrlConstants.DeleteStaffDesignationMaster;
    console.log('URL: ' + url);
    const params = { StaffDesignationMasterID: staffDesignationMasterID, UpdatedBy: updatedBy || '' };
    console.log('Params: ' + JSON.stringify(params));
    return this.http.delete<any[]>(url, { params });
  }
  // End Region: Designation Master

  // Region: Section Teacher Master
  GetAllSectionTeacherMappingDetails() {
    const url = APIUrlConstants.GetAllSectionTeacherMappingDetails;
    console.log('URL: ' + url);
    return this.http.get<SectionTeacherMasterModel>(url);
  }
  UpsertSectionTeacherMaster(objSectionTeacherViewModel: SectionTeacherViewModel) {
    const url = APIUrlConstants.UpsertSectionTeacherMaster;
    console.log('URL: ' + url);
    console.log('Params: ' + JSON.stringify(objSectionTeacherViewModel));
    return this.http.post<any[]>(url, objSectionTeacherViewModel);
  }
  // End Region: Section Teacher Master

  // Region: Section Teacher Master
  GetAllSectionStudentMappingDetails() {
    const url = APIUrlConstants.GetAllSectionStudentMappingDetails;
    console.log('URL: ' + url);
    return this.http.get<SectionStudentMasterModel>(url);
  }
  UpsertSectionStudentMapping(file: File): Observable<any> {
    const url = APIUrlConstants.UpsertSectionStudentMapping;
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(url, formData, { responseType: 'text' });
  }
  // End Region: Section Teacher Master
}
