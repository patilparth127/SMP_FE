// Interface for Student Basic Details
export interface StudentBasicDetails {
    studentID?: number;
    parentsID?: number;
    studentOtherDetailsID?: number | null;
    rollNo?: string;
    firstName?: string;
    lastName?: string;
    gender: boolean;
    birthDate: string; // DateTime in ISO format
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
    resignationDate?: string | null; // DateTime in ISO format or null
  }
  
  // Interface for Student Other Details
  export interface StudentOtherDetails {
    isSpecialNeedChild: boolean;
    isHandicape: boolean;
    motherTongue?: string;
    familyPhotoPath?: string;
    foodPreference?: string;
    foodRestriction?: string;
    admissionNumber?: string;
    admissionInquiryNumber?: string;
    admissionGrantedDate?: string | null; // DateTime in ISO format or null
    dateOfJoin?: string; // DateTime in ISO format
  }
  
  // Interface for Parents Details
  export interface ParentsDetails {
    parentsSchoolEmailID?: string;
    fathersName?: string;
    fathersMobileNo?: string;
    fathersPersonalEmailID?: string;
    fathersEmploymentStatus?: string;
    fathersEmploymentSector?: string;
    fathersSpeciality?: string;
    fathersOccupationProfile?: string;
    fathersOrganizationName?: string;
    fathersCanOfferInternship: boolean;
    fathersWorkPlaceFieldTripPermission: boolean;
    fathersWorkPlaceInfo?: string;
    mothersName?: string;
    mothersMobileNo?: string;
    mothersPersonalEmailID?: string;
    mothersEmploymentStatus?: string;
    mothersEmploymentSector?: string;
    mothersSpeciality?: string;
    mothersOccupationProfile?: string;
    mothersOrganizationName?: string;
    mothersCanOfferInternship: boolean;
    mothersWorkPlaceFieldTripPermission: boolean;
    mothersWorkPlaceInfo?: string;
    guardianName?: string;
    guardianNumber?: string;
    guardianEmailID?: string;
    guardianRelationship?: string;
    gradeName?: string;
    sectionName?: string;
  }
  
  // Combined Interface for the Full Response
  export interface StudentData {
    studentBasicDetails: StudentBasicDetails;
    studentOtherDetails: StudentOtherDetails;
    parentsDetails: ParentsDetails;
  }
  