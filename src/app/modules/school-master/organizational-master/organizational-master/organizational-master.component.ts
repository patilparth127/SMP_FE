import { Component } from '@angular/core';
import { MasterPageComponent } from '../../../../components/master-page/master-page.component';
import { SharedService } from '../../../../services/shared.service';
import { DesignationMasterComponent } from '../designation-master/designation-master.component';
import { OrganizationDepartmentComponent } from '../organization-department/organization-department.component';
import { OrganizationGroupComponent } from '../organization-group/organization-group.component';
import { OrganizationTeamComponent } from '../organization-team/organization-team.component';

@Component({
  selector: 'app-organizational-master',
  standalone: true,
  templateUrl: './organizational-master.component.html',
  styleUrl: './organizational-master.component.css',
  imports: [
    MasterPageComponent,
    OrganizationGroupComponent,
    OrganizationDepartmentComponent,
    OrganizationTeamComponent,
    DesignationMasterComponent,
  ],
})
export class OrganizationalMasterComponent {
  constructor(private sharedService: SharedService) {}

  reload() {
    this.sharedService.reloadComponent();
  }
}
