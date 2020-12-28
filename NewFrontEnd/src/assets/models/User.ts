export interface UserNameEmail {
  name: string;
  email: string;
}

export interface User extends UserNameEmail {
  token: string;
  description: string;
  major: string;
  schoolYear: string;
  phone: string;
}

export const dummyUser = {
  name: '',
  email: '',
  token: '',
  description: '',
  major: '',
  schoolYear: '',
  phone: '',
};
