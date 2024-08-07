import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormStateService } from './formstate.service';

@Directive({
  selector: '[appErrorHandling]',
  standalone: true
})
export class ErrorHandlingDirective implements OnInit, OnDestroy {
  @Input('patternMsg') patternMsg?: string = "";

  private valueChangesSubscription: Subscription | undefined;

  constructor(private ngControl: NgControl, private renderer: Renderer2, private el: ElementRef, private formStateService: FormStateService) { }

  ngOnInit(): void {
    this.valueChangesSubscription = this.ngControl?.statusChanges?.subscribe(() => {
      this.checkValidity();
    });

    this.formStateService.touched$.subscribe(() => {
      this.checkValidity();
    });
  }

  ngOnDestroy() {
    // Unsubscribe from valueChanges to prevent memory leaks
    this.valueChangesSubscription?.unsubscribe();
  }

  private checkValidity() {
    const errorElement = this.getErrorElement();
    if (this.ngControl.dirty || this.ngControl.touched) {
      if (this.ngControl.invalid) {
        const errorMessage = this.getErrorMessage();

        // Setting up border color to current element before applying error text below it.
       if (this.el.nativeElement.tagName.toLowerCase() === 'select') {
          this.renderer.setStyle(this.el.nativeElement, 'border-color', '#b80000');
        } else {
          this.renderer.setStyle(this.el.nativeElement, 'border-color', '#b80000');
        }

        this.renderer.setProperty(errorElement, 'textContent', errorMessage || '');
        this.renderer.setStyle(errorElement, 'display', 'block');
      } else {

        // Removing border color to current element.
        if (this.el.nativeElement.tagName.toLowerCase() === 'select') {
          this.renderer.setStyle(this.el.nativeElement, 'border-color', 'var(--tb-border-color)');
        } else {
          this.renderer.setStyle(this.el.nativeElement, 'border-color', 'var(--tb-border-color)');
        }

        this.renderer.setProperty(errorElement, 'textContent', '');
        this.renderer.setStyle(errorElement, 'display', 'none');
      }
    }
  }

  private getErrorElement(): HTMLElement {
    let errorElement = this.el.nativeElement.parentElement.querySelector('.error-message');
    if (!errorElement) {
      errorElement = this.renderer.createElement('div');
      this.renderer.addClass(errorElement, 'error-message');
      this.renderer.appendChild(this.el.nativeElement.parentElement, errorElement);
    }
    return errorElement;
  }

  private getErrorMessage(): string {
    const errorMessages: string[] = [];
    const control = this.ngControl.control;
    if (control?.errors) {
      Object.keys(control.errors).forEach(error => {
        switch (error) {
          case 'required':
            errorMessages.push('This field is required.');
            break;
          case 'email':
            errorMessages.push('Email is Invalid.');
            break;
          // case 'minlength':
          //   errorMessages.push(`Minimum length is ${control.errors['minlength'].requiredLength} characters.`);
          //   break;
          // case 'maxlength':
          //   errorMessages.push(`Maximum length is ${control.errors['maxlength'].requiredLength} characters.`);
          //   break;
          // case 'min':
          //   errorMessages.push(`Number should be greater than or equal to ${control.errors['min'].min}.`);
          //   break;
          // case 'max':
          //   errorMessages.push(`Number should be less than or equal to ${control.errors['max'].max}.`);
          //   break;
          case 'pattern':
            errorMessages.push(this.patternMsg || 'Invalid pattern.');
            break;
          default:
            errorMessages.push('Invalid pattern.');
        }
      });
    }
    return errorMessages.join(' ');
  }
}
