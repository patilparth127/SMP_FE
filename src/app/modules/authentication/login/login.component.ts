import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(private loginAuth: AuthService, private router: Router) {}
  ngOnInit(): void {}

  loginMethod: string = 'UserNameNPassword';
  disableLoginButton: boolean = true;
  hidePassword: boolean = true;
  isGetOtpBtnShown: boolean = false;
  isLoginBtnShown: boolean = true;
  isOTPDivShown: boolean = false;
  otpFromAPI: string = '';

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    pwd: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    otp: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(5),
    ]),
  });
  loginFormSubmited() {
    if (this.otpFromAPI !== '') {
      if (this.otpFromAPI === this.loginForm.value.otp) {
        this.otpFromAPI = '';
        this.router.navigate(['/home']);
      } else {
        alert('Invalid OTP.');
      }
    }
    this.loginAuth
      .AuthenticateUser(
        this.loginMethod,
        this.loginForm.value.username ?? '',
        this.loginForm.value.pwd ?? '',
        this.loginForm.value.email ?? '',
        this.loginForm.value.mobile ?? ''
      )
      .subscribe(
        (res) => {
          console.log('AuthenticateUser Response: ' + JSON.stringify(res));
          if (res === null || res === undefined) {
            alert('Invalid username or password !');
          } else {
            if (res[0].isSuccess) {
              if (
                this.loginMethod === 'Email' ||
                this.loginMethod === 'Mobile'
              ) {
                this.isGetOtpBtnShown = false;
                this.isLoginBtnShown = true;
                this.otpFromAPI = res[0].otPval;
                this.isOTPDivShown = true;
                this.loginMethod = '';
                alert('You will receive OTP shortly.');
              } else {
                this.router.navigate(['/home']);
              }
            } else {
              alert(res[0].messageVal);
            }
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }
  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }
  enableLoginButton() {
    if (this.loginMethod === 'UserNameNPassword') {
      if (this.Username.invalid || this.PWD.invalid) {
        this.disableLoginButton = true;
      } else {
        this.disableLoginButton = false;
      }
      this.isGetOtpBtnShown = false;
      this.isLoginBtnShown = true;
    } else if (this.loginMethod === 'Email') {
      if (this.Email.invalid) {
        this.disableLoginButton = true;
      } else {
        this.disableLoginButton = false;
      }
      this.isGetOtpBtnShown = true;
      this.isLoginBtnShown = false;
    } else if (this.loginMethod === 'Mobile') {
      if (this.Mobile.invalid) {
        this.disableLoginButton = true;
      } else {
        this.disableLoginButton = false;
      }
      this.isGetOtpBtnShown = true;
      this.isLoginBtnShown = false;
    }
  }
  showUsernameForm() {
    this.loginMethod = 'UserNameNPassword';
    this.enableLoginButton();
    this.isOTPDivShown=false;
    this.otpFromAPI='';
  }
  showEmailForm() {
    this.loginMethod = 'Email';
    this.enableLoginButton();
    this.isOTPDivShown=false;
    this.otpFromAPI='';
  }
  showMobileForm() {
    this.loginMethod = 'Mobile';
    this.enableLoginButton();
    this.isOTPDivShown=false;
    this.otpFromAPI='';
  }
  get Username(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }
  get PWD(): FormControl {
    return this.loginForm.get('pwd') as FormControl;
  }
  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get Mobile(): FormControl {
    return this.loginForm.get('mobile') as FormControl;
  }
  get OTP(): FormControl {
    return this.loginForm.get('otp') as FormControl;
  }
}
