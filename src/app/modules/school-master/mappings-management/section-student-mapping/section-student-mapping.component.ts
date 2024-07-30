import { Component } from '@angular/core';
import { SchoolMasterService } from '../../../../services/school-master-services/school-master.service';
import { MasterPageComponent } from '../../../../components/master-page/master-page.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-section-student-mapping',
  standalone: true,
  imports: [CommonModule, MasterPageComponent],
  templateUrl: './section-student-mapping.component.html',
  styleUrl: './section-student-mapping.component.css'
})
export class SectionStudentMappingComponent {
  selectedFile: File | null = null;

  constructor(
    private schoolMasterService: SchoolMasterService
  ) { }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] || null;
  }

  onSubmit(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.schoolMasterService.UpsertSectionStudentMapping(this.selectedFile).subscribe(
        (data) => {
          alert(data);
        },
        (error) => {
          console.error('Error:', error);
          alert(error);
        }
      );
    }
  }

}
