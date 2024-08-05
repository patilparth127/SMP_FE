import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailNotificationComponent } from './mail-notification.component';

describe('MailNotificationComponent', () => {
  let component: MailNotificationComponent;
  let fixture: ComponentFixture<MailNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MailNotificationComponent]
    });
    fixture = TestBed.createComponent(MailNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
