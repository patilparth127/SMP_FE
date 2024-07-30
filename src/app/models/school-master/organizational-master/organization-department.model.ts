export class OrganizationDepartmentModel {
  organizationDepartmentID!: number;
  organizationGroupID!: number;
  groupName!: string;
  departmentName!: string;
  isDeleted!: boolean;
  createdBy!: number;
  updatedBy!: number | null;
}
