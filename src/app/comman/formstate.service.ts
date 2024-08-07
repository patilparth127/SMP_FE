import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormStateService {
  private touchedSubject = new BehaviorSubject<boolean>(false);
  touched$ = this.touchedSubject.asObservable();

  markAllAsTouched() {
    this.touchedSubject.next(true);
  }
}
