import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../../../common/constants';
import { StudentObservationCategory, StudentObservationSubCategoryMasterModel } from '../../interfaces/observation';


@Injectable({
  providedIn: 'root'
})
export class ObservationService {

  private Endpoint: string = Constants.API_BASE_URL;

  constructor(private http: HttpClient) { }

  getallStudentObservationCategory(){
    return this.http.get<any>(`${this.Endpoint}StudentObservationMaster/getallStudentObservationCategory`)
  }
  getallStudentObservationCategoryById(id : any){
    return this.http.get<any>(`${this.Endpoint}StudentObservationMaster/getStudentObservationCategoryByID?StudentObservationCategoryID=${id}`)
  }
  InsertNUpdateStudentObservationCategory(body : StudentObservationCategory):Observable<any>{
    return this.http.post<any>(`${this.Endpoint}StudentObservationMaster/InsertNUpdateStudentObservationCategory`,body)
  }
  deleteStudentObservationCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.Endpoint}StudentObservationMaster/DeleteStudentObservationCategoryByID?StudentObservationCategoryID=${id}`);
  }
  getAllStudentObservationSubCategory(){
    return this.http.get<any>(`${this.Endpoint}StudentObservationMaster/GetAllStudentObservationSubCategory`)
  }
  studentObservationSubCategoryID(id : any){
    return this.http.get<any>(`${this.Endpoint}StudentObservationMaster/GetStudentObservationSubCategoryByID?StudentObservationSubCategoryID=${id}`)
  }
  upsertStudentObservationSubCategory(body : StudentObservationSubCategoryMasterModel):Observable<any>{
    return this.http.post<any>(`${this.Endpoint}StudentObservationMaster/UpsertStudentObservationSubCategory`,body)
  }
  deleteStudentObservationSubCategoryByID(id : any):Observable<any>{
    return this.http.delete<any>(`${this.Endpoint}StudentObservationMaster/DeleteStudentObservationCategoryByID?StudentObservationCategoryID=${id}`);
  }
}
