// api.constants.ts

import { environment } from "../environments/environment";

export const BaseApiConstants = {
  baseUrl: environment.apiBaseUrl
};

export const APIUrlConstants = {
  // User Master
  AuthenticateUser: `${BaseApiConstants.baseUrl}UserMaster/AuthenticateUser`,

  // Academic Year
  GetAcademicYearByAcademicYearID: `${BaseApiConstants.baseUrl}AcademicYear/getAcademicYearByAcademicYearID`,
  GetAllAcademicYear: `${BaseApiConstants.baseUrl}AcademicYear/getAllAcademicYear`,
  DeleteAcademicYearByAcademicYearID: `${BaseApiConstants.baseUrl}AcademicYear/DeleteAcademicYearByAcademicYearID`,
  InsertNUpdateAcademicYear: `${BaseApiConstants.baseUrl}AcademicYear/InsertNUpdateAcademicYear`,

  // Board Master
  GetallBoardList: `${BaseApiConstants.baseUrl}BoardMaster/getallBoardList`,
  GetBoardMasterByBoardID: `${BaseApiConstants.baseUrl}BoardMaster/getBoardMasterByBoardID`,
  DeleteBoardMasterByBoardID: `${BaseApiConstants.baseUrl}BoardMaster/DeleteBoardMasterByBoardID`,
  InsertNUpdateBoardMaster: `${BaseApiConstants.baseUrl}BoardMaster/InsertNUpdateBoardMaster`,

  // Program Master
  GetProgramByProgramID: `${BaseApiConstants.baseUrl}Program/getProgramByProgramID`,
  GetAllProgramByBoardID: `${BaseApiConstants.baseUrl}Program/getAllProgramByBoardID`,
  GetallPrograms: `${BaseApiConstants.baseUrl}Program/getallPrograms`,
  DeleteProgramByProgramID: `${BaseApiConstants.baseUrl}Program/DeleteProgramByProgramID`,
  InsertNUpdateProgram: `${BaseApiConstants.baseUrl}Program/InsertNUpdateProgram`,

  // Term Master
  GetAllAcademicTerm: `${BaseApiConstants.baseUrl}AcademicTerm/GetAllAcademicTerm`,
  GetAcademicTermByTermID: `${BaseApiConstants.baseUrl}AcademicTerm/getAcademicTermByTermID`,
  GetallTermByBoardNProgramNAYID: `${BaseApiConstants.baseUrl}AcademicTerm/getallTermByBoardNProgramNAYID`,
  GetallTermByAYIDNBoard: `${BaseApiConstants.baseUrl}AcademicTerm/getallTermByAYIDNBoard`,
  DeleteAcademicTermByTermID: `${BaseApiConstants.baseUrl}AcademicTerm/DeleteAcademicTermByTermID`,
  InsertNUpdateAcademicTerm: `${BaseApiConstants.baseUrl}AcademicTerm/InsertNUpdateAcademicTerm`,

  // Grade
  GetGradeByGradeID: `${BaseApiConstants.baseUrl}Grade/getGradeByGradeID`,
  GetAllGradeByAcademicYearIDNBoardID: `${BaseApiConstants.baseUrl}Grade/getAllGradeByAcademicYearIDNBoardID`,
  GetAllGradeByProgramID: `${BaseApiConstants.baseUrl}Grade/getAllGradeByProgramID`,
  DeleteGradeByGradeID: `${BaseApiConstants.baseUrl}Grade/DeleteGradeByGradeID`,
  InsertNUpdateGrade: `${BaseApiConstants.baseUrl}Grade/InsertNUpdateGrade`,

  // Section
  GetSectionBySectionID: `${BaseApiConstants.baseUrl}Section/getSectionBySectionID`,
  GetAllSectionByGradeID: `${BaseApiConstants.baseUrl}Section/getAllSectionByGradeID`,
  GetAllSectionByAcademicYearIDNProgramID: `${BaseApiConstants.baseUrl}Section/getAllSectionByAcademicYearIDNProgramID`,
  DeleteSectionBySectionID: `${BaseApiConstants.baseUrl}Section/DeleteSectionBySectionID`,
  InsertNUpdateSection: `${BaseApiConstants.baseUrl}Section/InsertNUpdateSection`,

  // Region: Student Master
  UpsertStudentBasicDetails: `${BaseApiConstants.baseUrl}StudentMaster/UpsertStudentBasicDetails`,
  UpsertParentsDetails: `${BaseApiConstants.baseUrl}StudentMaster/UpsertParentsDetails`,
  UpsertStudentOtherDetails: `${BaseApiConstants.baseUrl}StudentMaster/UpsertStudentOtherDetails`,
  GetAllStudentDetails: `${BaseApiConstants.baseUrl}StudentMaster/GetAllStudentDetails`,
  UploadStudentProfileImage: `${BaseApiConstants.baseUrl}StudentMaster/UploadStudentProfileImage`,
  UploadStudentFamilyPhoto: `${BaseApiConstants.baseUrl}StudentMaster/UploadStudentFamilyPhoto`,

  // Region: Staff Master
  GetAllStaffDetails: `${BaseApiConstants.baseUrl}StaffMaster/GetAllStaffDetails`,

  
  // Organization Group
  GetAllOrganizationGroup: `${BaseApiConstants.baseUrl}OrganizationGroup/GetAllOrganizationGroup`,
  UpsertOrganizationGroup: `${BaseApiConstants.baseUrl}OrganizationGroup/UpsertOrganizationGroup`,
  DeleteOrganizationGroup: `${BaseApiConstants.baseUrl}OrganizationGroup/DeleteOrganizationGroup`,

  // Organization Department
  GetAllOrganizationDepartment: `${BaseApiConstants.baseUrl}OrganizationDepartment/GetAllOrganizationDepartment`,
  UpsertOrganizationDepartment: `${BaseApiConstants.baseUrl}OrganizationDepartment/UpsertOrganizationDepartment`,
  DeleteOrganizationDepartment: `${BaseApiConstants.baseUrl}OrganizationDepartment/DeleteOrganizationDepartment`,

  // Organization Team
  GetAllOrganizationTeam: `${BaseApiConstants.baseUrl}OrganizationTeam/GetAllOrganizationTeam`,
  UpsertOrganizationTeam: `${BaseApiConstants.baseUrl}OrganizationTeam/UpsertOrganizationTeam`,
  DeleteOrganizationTeam: `${BaseApiConstants.baseUrl}OrganizationTeam/DeleteOrganizationTeam`,

  // Staff Designation Master
  GetAllStaffDesignationMaster: `${BaseApiConstants.baseUrl}StaffDesignationMaster/GetAllStaffDesignationMaster`,
  UpsertStaffDesignationMaster: `${BaseApiConstants.baseUrl}StaffDesignationMaster/UpsertStaffDesignationMaster`,
  DeleteStaffDesignationMaster: `${BaseApiConstants.baseUrl}StaffDesignationMaster/DeleteStaffDesignationMaster`,

  // Section Teacher Master
  GetAllSectionTeacherMappingDetails: `${BaseApiConstants.baseUrl}SectionTeacherMaster/GetAllSectionTeacherMappingDetails`,
  UpsertSectionTeacherMaster: `${BaseApiConstants.baseUrl}SectionTeacherMaster/UpsertSectionTeacherMaster`,

  // Section Student Master
  GetAllSectionStudentMappingDetails: `${BaseApiConstants.baseUrl}SectionStudentMapping/GetAllSectionStudentMappingDetails`,
  UpsertSectionStudentMapping: `${BaseApiConstants.baseUrl}SectionStudentMapping/UpsertSectionStudentMapping`,
};
