export class StudentMasterModel {
  studentID?: number;
  parentsID?: number;
  studentOtherDetailsID?: number;
  rollNo?: string;
  firstName?: string;
  lastName?: string;
  gender!: boolean;
  birthDate!: Date;
  studentSchoolEmailID?: string;
  bloodGroup?: string;
  emergencyContactNo?: string;
  whatsappNumber?: string;
  houseNo?: string;
  societyName?: string;
  landmark?: string;
  area?: string;
  city?: string;
  zip?: string;
  state?: string;
  country?: string;
  house?: string;
  imagePath?: string;
  aadharCardNo?: string;
  nationality?: string;
  religion?: string;
  caste?: string;
  subCaste?: string;
  isSpecialNeedChild!: boolean;
  isHandicape!: boolean;
  motherTongue?: string;
  familyPhotoPath?: string;
  foodPreference?: string;
  foodRestriction?: string;
  admissionNumber?: string;
  admissionInquiryNumber?: string;
  admissionGrantedDate?: Date;
  resignationDate?: Date;
  UDISENumber?: string;
  PENNumber?: string;
  dateOfJoin?: Date;
  parentsSchoolEmailID?: string;
  fathersName?: string;
  fathersMobileNo?: string;
  fathersPersonalEmailID?: string;
  fathersEmploymentStatus?: string;
  fathersEmploymentSector?: string;
  fathersSpeciality?: string;
  fathersOccupationProfile?: string;
  fathersOrganizationName?: string;
  fathersCanOfferInternship!: boolean;
  fathersWorkPlaceFieldTripPermission!: boolean;
  fathersWorkPlaceInfo?: string;
  mothersName?: string;
  mothersMobileNo?: string;
  mothersPersonalEmailID?: string;
  mothersEmploymentStatus?: string;
  mothersEmploymentSector?: string;
  mothersSpeciality?: string;
  mothersOccupationProfile?: string;
  mothersOrganizationName?: string;
  mothersCanOfferInternship!: boolean;
  mothersWorkPlaceFieldTripPermission!: boolean;
  mothersWorkPlaceInfo?: string;
  guardianName?: string;
  guardianNumber?: string;
  guardianEmailID?: string;
  guardianRelationship?: string;
  gradeName?: string;
  sectionName?: string;
}

export class StudentBasicDetailsModel {
  studentID?: number;
  parentsID?: number;
  studentOtherDetailsID?: number;
  rollNo?: string;
  firstName?: string;
  lastName?: string;
  gender!: boolean;
  birthDate!: Date;
  studentSchoolEmailID?: string;
  bloodGroup?: string;
  emergencyContactNo?: string;
  whatsappNumber?: string;
  houseNo?: string;
  societyName?: string;
  landmark?: string;
  area?: string;
  city?: string;
  zip?: string;
  state?: string;
  country?: string;
  house?: string;
  imagePath?: string;
  aadharCardNo?: string;
  nationality?: string;
  religion?: string;
  Caste?: string;
  subCaste?: string;
  resignationDate?: Date | null = null;
  UDISENumber?: string;
  PENNumber?: string;
  createdBy?: string;
}

export class ParentsDetailsModel {
  studentID?: number | null;
  parentsID?: number | null;
  parentsSchoolEmailID?: string | null;
  fathersName?: string | null;
  fathersMobileNo?: string | null;
  fathersPersonalEmailID?: string | null;
  fathersEmploymentStatus?: string | null;
  fathersEmploymentSector?: string | null;
  fathersSpecialty?: string | null;
  fathersOccupationProfile?: string | null;
  fathersOrganizationName?: string | null;
  fathersCanOfferInternship: boolean = false;
  fathersWorkPlaceFieldTripPermission: boolean = false;
  fathersWorkPlaceInfo?: string | null;
  mothersName?: string | null;
  mothersMobileNo?: string | null;
  mothersPersonalEmailID?: string | null;
  mothersEmploymentStatus?: string | null;
  mothersEmploymentSector?: string | null;
  mothersSpecialty?: string | null;
  mothersOccupationProfile?: string | null;
  mothersOrganizationName?: string | null;
  mothersCanOfferInternship: boolean = false;
  mothersWorkPlaceFieldTripPermission: boolean = false;
  mothersWorkPlaceInfo?: string | null;
  guardianName?: string | null;
  guardianNumber?: string | null;
  guardianEmailID?: string | null;
  guardianRelationship?: string | null;
  createdBy?: string;
}

export class StudentOtherDetailsModel {
  studentID?: number | null;
  studentOtherDetailsID!: number;
  isSpecialNeedChild: boolean = false;
  isHandicape: boolean = false;
  motherTongue?: string | null;
  familyPhotoPath?: string | null;
  foodPreference?: string | null;
  foodRestriction?: string | null;
  admissionNumber?: string | null;
  admissionInquiryNumber?: string | null;
  admissionGrantedDate?: Date | null;
  dateOfJoin?: Date | null;
  createdBy?: string;
}

export interface StudentIDResponse {
  studentID: number;
}


