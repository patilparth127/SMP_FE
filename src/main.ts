
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingDirective } from './app/comman/error-handling.directive';
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    importProvidersFrom(BrowserAnimationsModule,CommonModule,FormsModule,ReactiveFormsModule),
  //  importProvidersFrom(ToastrModule.forRoot()),
    importProvidersFrom(ErrorHandlingDirective),
    ...(appConfig.providers || [])
  ]
  
})
  .catch(err => console.error(err));


