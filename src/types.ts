export interface UserData {
  fullName: string;
  email: string;
  phone: string;
  selectedCategory: number;
}

export interface StepProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  onNext: () => void;
  allFormData: (data: UserData) => void;
}
