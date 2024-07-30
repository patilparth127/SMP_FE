import { Component } from '@angular/core';
import { MasterPageComponent } from '../../../../components/master-page/master-page.component';
import { SharedService } from '../../../../services/shared.service';
import { AcademicBoardComponent } from '../academic-board/academic-board.component';
import { AcademicProgramComponent } from '../academic-program/academic-program.component';
import { AcademicTermComponent } from '../academic-term/academic-term.component';
import { AcademicYearComponent } from '../academic-year/academic-year.component';
import { GradeComponent } from '../grade/grade.component';
import { SectionComponent } from '../section/section.component';

@Component({
  selector: 'app-academic-master',
  standalone: true,
  imports: [
    MasterPageComponent,
    AcademicProgramComponent,
    AcademicYearComponent,
    AcademicTermComponent,
    AcademicBoardComponent,
    SectionComponent,
    GradeComponent,
  ],
  templateUrl: './academic-master.component.html',
  styleUrl: './academic-master.component.css'
})
export class AcademicMasterComponent {
  constructor(private sharedService: SharedService) {}

  reload() {
    this.sharedService.reloadComponent();
  }
}
