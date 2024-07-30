import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterPageComponent } from "../../../../components/master-page/master-page.component";
import { GradeSectionModel, SectionTeacherMasterModel, SectionTeacherViewModel, TeacherModel } from '../../../../models/school-master/section-teacher-master/section-teacher-master.model';
import { SchoolMasterService } from '../../../../services/school-master-services/school-master.service';

@Component({
  selector: 'app-section-teacher-master',
  standalone: true,
  templateUrl: './section-teacher-master.component.html',
  styleUrl: './section-teacher-master.component.css',
  imports: [CommonModule, FormsModule, MasterPageComponent]
})
export class SectionTeacherMasterComponent {
  objSectionTeacherMaster!: SectionTeacherMasterModel;
  lstAllGradeSection!: GradeSectionModel[];
  lstAllTeachers!: TeacherModel[];

  constructor(
    private schoolMaster: SchoolMasterService
  ) { }
  ngOnInit(): void {
    this.GetAllSectionTeacherMappingDetails();
  }
  GetAllSectionTeacherMappingDetails() {
    this.schoolMaster
      .GetAllSectionTeacherMappingDetails()
      .subscribe(
        (data) => {
          console.log('GetAllSectionTeacherMappingDetails Response:');
          console.log(data);
          this.objSectionTeacherMaster = data;
          this.lstAllGradeSection = this.objSectionTeacherMaster.lstGradeSectionMaster ?? [];
          this.lstAllTeachers = this.objSectionTeacherMaster.lstTeacher ?? [];
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  UpsertSectionTeacherMaster(selectedTeacherID: number, item: GradeSectionModel) {
    let objSectionTeacherViewModel: SectionTeacherViewModel;
    objSectionTeacherViewModel = {
      sectionTeacherMasterID: item.sectionTeacherMasterID,
      gradeID: item.gradeID,
      sectionID: item.sectionID,
      teacherID: selectedTeacherID,
      gradeName: item.gradeName,
      sectionName: item.sectionName,
      teacherName: '',
      createdDateTime: new Date(),
      createdBy: '',
      updatedDateTime: new Date(),
      updatedBy: ''
    };
    this.schoolMaster.UpsertSectionTeacherMaster(objSectionTeacherViewModel).subscribe(
      (res) => {
        console.log('UpsertSectionTeacherMaster Response:');
        console.log(res);
        if (res === null || res === undefined) {
          alert('Something went wrong.');
        } else {
          alert('Section Teacher Mapping has been done successfully.');
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  onTeacherChange(event: any, item: GradeSectionModel) {
    const selectedTeacherID = event.target.value;
    if (selectedTeacherID) {
      this.UpsertSectionTeacherMaster(selectedTeacherID, item);
    }
  }
}
