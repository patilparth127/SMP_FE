export class OrganizationTeamModel {
  organizationTeamID!: number;
  organizationGroupID!: number;
  groupName!: string;
  organizationDepartmentID!: number;
  departmentName!: string;
  teamName!: string;
  isDeleted!: boolean;
  createdDateTime!: Date | null;
  createdBy!: string | null;
  updatedDateTime!: Date | null;
  updatedBy!: string | null;
}
