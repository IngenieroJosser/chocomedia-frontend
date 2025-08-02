export interface ICreateAccount {
  name: string;
  email: string;
  password: string;
}

export interface IValidateAccount {
  email: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'USER' | 'CREATOR' | 'ADMIN';
  };
}

export interface IRegisterCreator {
  name: string;
  email: string;
  password: string;
  artisticName: string;
  culturalDomain: string;
}