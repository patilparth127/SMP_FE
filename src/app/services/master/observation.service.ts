import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../../../common/constants';
import { StudentObservationAttribute, StudentObservationCategory, StudentObservationSubCategoryMasterModel, StudentQuestionObservation } from '../../interfaces/observation';


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
    return this.http.delete<any>(`${this.Endpoint}StudentObservationMaster/DeleteStudentObservationSubCategoryByID?StudentObservationSubCategoryID=${id}`);
  }

  getAllStudentObservationAttributes(){
    return this.http.get<any>(`${this.Endpoint}StudentObservationMaster/GetAllStudentObservationAttributes`)
  }
  getStudentObservationAttributeByID(id : any){
    return this.http.get<any>(`${this.Endpoint}StudentObservationMaster/GetStudentObservationAttributeByID?StudentObservationAttributeID=${id}`)
  }
  upsertStudentObservationAttribute(body : StudentObservationAttribute):Observable<any>{
    return this.http.post<any>(`${this.Endpoint}StudentObservationMaster/UpsertStudentObservationAttribute`,body)
  }
  DeleteStudentObservationAttributeByID(id : any):Observable<any>{
    return this.http.delete<any>(`${this.Endpoint}StudentObservationMaster/DeleteStudentObservationAttributeByID?StudentObservationAttributeID=${id}`);
  }

  getAllStudentObservationQuestions(){
    return this.http.get<any>(`${this.Endpoint}StudentObservationMaster/GetAllStudentObservationQuestions`)
  }
  getStudentObservationQuestionByID(id : any){
    return this.http.get<any>(`${this.Endpoint}StudentObservationMaster/GetStudentObservationQuestionByID?StudentObservationQuestionID=${id}`)
  }
  upsertStudentObservationQuestion(body : StudentQuestionObservation):Observable<any>{
    return this.http.post<any>(`${this.Endpoint}StudentObservationMaster/UpsertStudentObservationQuestion`,body)
  }
  deleteStudentObservationQuestionByID(id : any):Observable<any>{
    return this.http.delete<any>(`${this.Endpoint}StudentObservationMaster/DeleteStudentObservationQuestionByID?StudentObservationQuestionID=${id}`);
  }
}
