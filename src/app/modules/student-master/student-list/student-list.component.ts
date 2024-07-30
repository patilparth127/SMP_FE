import { Component } from '@angular/core';
import { MasterPageComponent } from '../../../components/master-page/master-page.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StudentMasterService } from '../../../services/student-master-services/student-master.service';
import { StudentMasterModel } from '../../../models/student-master/student.master.model';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-student-list',
  standalone: true,
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css',
  imports: [CommonModule, ReactiveFormsModule, MasterPageComponent, NgxPaginationModule],
  providers: [DatePipe],
})
export class StudentListComponent {
  freeTextSearch: FormControl | undefined;
  lstStudentDetails!: StudentMasterModel[];
  pagedStudents: any[] = [];
  formGroup!: FormGroup;
  page: number = 1;
  currentView: string = 'card';
  totalRecords: number = 0;
  recordsOnPage: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 25;
  defaultImagePath = 'assets/images/users/avatar-2.jpg';

  ngOnInit() {
    this.formGroup = new FormGroup({
      freeTextSearch: new FormControl('')
    });
    this.formGroup.get('freeTextSearch')!.valueChanges.subscribe(value => {
      console.log('User input:', value);
      this.GetAllStudentDetails(value);
    });
    this.freeTextSearch = new FormControl('');
    this.freeTextSearch.valueChanges.subscribe(value => {
      console.log('User input:', value);
      this.GetAllStudentDetails(value);
    });
  }

  constructor(
    private datePipe: DatePipe,
    private studentMasterService: StudentMasterService,
    private router: Router
  ) {
    this.GetAllStudentDetails();
  }

  formatBirthDate(date: Date): string {
    return this.datePipe.transform(date, 'dd MMM yyyy') || '';
  }

  GetAllStudentDetails(freeText?: string): void {
    this.studentMasterService.GetAllStudentDetails(freeText).subscribe(
      (data) => {
        console.log('GetAllStudentDetails Response:', data);
        this.lstStudentDetails = data;
        this.totalRecords = this.lstStudentDetails.length;
        this.updatePagedStudents();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  seeDetails(studentDetails: StudentMasterModel): void {
    this.router.navigate(['/student-details'], { state: { studentDetails, editProfile: 0 } });
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = this.defaultImagePath;
  }

  toggleView(view: string): void {
    this.currentView = view;
  }

  getRangeLabel(): string {
    const startIndex = (this.page - 1) * this.itemsPerPage + 1;
    let endIndex = this.page * this.itemsPerPage;
    if (endIndex > this.totalRecords) {
      endIndex = this.totalRecords;
    }
    return `${startIndex}-${endIndex} of ${this.totalRecords}`;
  }

  onPageChange(page: number): void {
    this.page = page;
  }

  updatePagedStudents(): void {
    debugger;
    const start = (this.page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedStudents = this.lstStudentDetails.slice(start, end);
    this.recordsOnPage = this.pagedStudents.length;
  }
}
