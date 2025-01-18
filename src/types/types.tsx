export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

export interface CreateUserError {
  message: string;
}

export interface User {
  fullName: string;
  email: string;
  phone: number;
  password: string;
}

export interface CreateUserResponse {
  uid: string;
  fullName: string;
  email: string;
  phone: number;
}

export interface UserState {
  uid: number | string;
  fullName: string;
  email: string;
  phone: number | null;
  password: string | null;
  user: CreateUserResponse | null;
}

export interface LoginUserInput {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
}

export interface FirestoreUserData {
  fullName: string;
  email: string;
  phone: string;
}

export interface LoginUserResponse {
  uid: string;
  fullName: string;
  email: string;
  phone: string;
}
