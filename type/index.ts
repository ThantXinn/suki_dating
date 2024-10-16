export type MultiFormData ={
  userId?: string;
  jobCategory: string;
  offDayCategory: string;
  offDayActivityCategory: string[];
  livingCategory: string;
  bodyHeightCategory: {
    firstInput: string;
    secondInput: string;
    thirdInput: string;
  };
  bodyTypeCategory: string;
  smokingCategory: string;
  personTypeCategory: string[];
  incomeCategory: string;
  educationCategory: string;
};

export interface type_userProfile{
  id: String;
  jobCategory?: String;
  offDayCategory?: String;
  offDayActivity?: String[];
  livingCategory?: String;
  bodyHeightCategory?: number;
  bodyTypeCategory?: String;
  smokingCategory?: String;
  personTypeCategory?: String[];
  incomeCategory?: String;
  educationCategory?: String;
  profilePhotoUrl?: String;
  userId: String;
}


export interface type_serarchResultImages{
  filename: string;
  public_id: string;
  secure_url: string;
  hotelId: string;
  width: number;
  height: number;
};

export interface type_HobbiesIntrestsValues{
  userHobbies: string[];
  userIntrests: string[];
  userValues: string[]
}