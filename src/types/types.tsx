export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

export interface CreateUserError {
  message: string;
}

export interface User {
  id?: string;
  fullName: string;
  email: string;
  phone: string | number | null;
  password: string;
}
export interface update {
  uid: string | undefined;
  fullName: string | undefined;
  email: string | undefined;
}

export interface CreateUserResponse {
  uid: string;
  fullName: string;
  email: string;
  phone: string | number | null;
}

export interface UserState {
  uid: number | string;
  fullName: string;
  email: string;
  phone: string | number | null;
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

export interface TodoData {
  id?: string;
  title?: string;
  notes?: string;
  tags?: string;
  dateTime?: Date | string;
}

export interface TodosState {
  todos: TodoData[];
  UpdateTodos: TodoData | null;
}
