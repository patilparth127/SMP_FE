import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIUrlConstants } from '../../api-endpoints.constants';
import { AppConfig } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  AuthenticateUser(
    authenicate_user_by: string,
    username: string,
    password: string,
    email: string,
    mobile: string
  ) {
    const domainname = AppConfig.domainName;
    console.log('At begining of the AuthenticateUser()');
    const url = APIUrlConstants.AuthenticateUser;
    console.log('URL: ' + url);

    
    const isNotEmpty = (value: any) =>
      value !== null && value !== undefined && value !== '';

    const params: any = {
      ...(isNotEmpty(domainname) && { DomainName: domainname }),
      ...(isNotEmpty(authenicate_user_by) && {AuthenicateUserBy: authenicate_user_by,}),
      ...(isNotEmpty(username) && { UserName: username }),
      ...(isNotEmpty(password) && { Password: password }),
      ...(isNotEmpty(email) && { EmailID: email }),
      ...(isNotEmpty(mobile) && { MobileNo: mobile }),
    };

    console.log('Params: ' + JSON.stringify(params));
    return this.http.get<any[]>(url, { params });
  }
}
