import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { APIUrlConstants } from '../../api-endpoints.constants';
import { ParentsDetailsModel, StudentBasicDetailsModel, StudentIDResponse, StudentOtherDetailsModel } from '../../models/student-master/student.master.model';

@Injectable({
  providedIn: 'root',
})
export class StudentMasterService {
  constructor(private http: HttpClient) { }

  // Region: Student Master
  GetAllStudentDetails(freeText?: string): Observable<any> {
    const url = APIUrlConstants.GetAllStudentDetails;
    console.log('URL: ' + url);
    let params = new HttpParams();
    if (freeText && freeText.trim().length > 0) {
      params = params.set('FreeText', freeText);
    }
    console.log('Params: ' + JSON.stringify(params));
    return this.http.get(url, { params });
  }
  // UpsertAcademicBoard(academicBoardModel: AcademicBoardModel) {
  //   const url = APIUrlConstants.InsertNUpdateBoardMaster;
  //   console.log('URL: ' + url);
  //   console.log('Params: ' + JSON.stringify(academicBoardModel));
  //   return this.http.post<any[]>(url, academicBoardModel);
  // }
  // DeleteAcademicBoardByBoardID(boardID: number) {
  //   const url = APIUrlConstants.DeleteBoardMasterByBoardID;
  //   console.log('URL: ' + url);
  //   const params = { BoardID: boardID };
  //   console.log('Params: ' + JSON.stringify(params));
  //   return this.http.delete<any[]>(url, { params });
  // }
  

  
  UpsertStudentBasicDetails(studentBasicDetailsModel: StudentBasicDetailsModel | undefined) {
    const url = APIUrlConstants.UpsertStudentBasicDetails;
    console.log('URL: ' + url);
    console.log('Params: ' + JSON.stringify(studentBasicDetailsModel));
    return this.http.post<StudentIDResponse>(url, studentBasicDetailsModel);
  }
  UploadStudentProfileImage(formData: FormData): Observable<{ filePath: string }> {
    const url = APIUrlConstants.UploadStudentProfileImage;
    console.log('URL: ' + url);
    return this.http.post<{ filePath: string }>(url, formData);
  }
  // End Region: registration - Student Basic Details

  // Region: registration - Student Parents Details
  UpsertParentsDetails(parentDetailsModel: ParentsDetailsModel | undefined) {
    const url = APIUrlConstants.UpsertParentsDetails;
    console.log('URL: ' + url);
    console.log('Params: ' + JSON.stringify(parentDetailsModel));
    return this.http.post<Number>(url, parentDetailsModel);
  }
  // End Region: registration - Student Parents Details

  // Region: registration - Student Other Details
  UpsertStudentOtherDetails(
    studentOtherDetailsModel: StudentOtherDetailsModel | undefined
  ) {
    const url = APIUrlConstants.UpsertStudentOtherDetails;
    console.log('URL: ' + url);
    console.log('Params: ' + JSON.stringify(studentOtherDetailsModel));
    return this.http.post<any[]>(url, studentOtherDetailsModel);
  }
  UploadStudentFamilyPhoto(formData: FormData): Observable<{ filePath: string }> {
    const url = APIUrlConstants.UploadStudentFamilyPhoto;
    console.log('URL: ' + url);
    return this.http.post<{ filePath: string }>(url, formData);
  }
  // End Region: Student Master
}

