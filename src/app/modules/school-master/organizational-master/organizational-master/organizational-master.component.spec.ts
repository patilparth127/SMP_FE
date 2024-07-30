import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganizationalMasterComponent } from './organizational-master.component';

describe('OrganizationalMasterComponent', () => {
  let component: OrganizationalMasterComponent;
  let fixture: ComponentFixture<OrganizationalMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationalMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizationalMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
