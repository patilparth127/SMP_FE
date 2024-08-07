import { Directive } from '@angular/core';

@Directive({
  selector: '[appError]',
  standalone: true
})
export class ErrorDirective {

  constructor() { }

}
