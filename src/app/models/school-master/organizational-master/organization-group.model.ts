export class OrganizationGroupModel {
  organizationGroupID!: number;
  groupName!: string;
  groupDescription!: string;
  isDeleted!: boolean;
  createdDateTime!: Date | null;
  createdBy!: string | null;
  updatedDateTime!: Date | null;
  updatedBy!: string | null;
}
