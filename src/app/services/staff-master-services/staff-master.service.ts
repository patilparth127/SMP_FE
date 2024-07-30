import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIUrlConstants } from '../../api-endpoints.constants';

@Injectable({
  providedIn: 'root'
})
export class StaffMasterService {
  constructor(private http: HttpClient) { }

  // Region: Staff Master
  GetAllStaffDetails(freeText?: string): Observable<any> {
    const url = APIUrlConstants.GetAllStaffDetails;
    console.log('URL: ' + url);
    let params = new HttpParams();
    if (freeText && freeText.trim().length > 0) {
      params = params.set('FreeText', freeText);
    }
    console.log('Params: ' + JSON.stringify(params));
    return this.http.get(url, { params });
  }
  // End Region: Staff Master
}
