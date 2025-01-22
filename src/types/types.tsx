import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {KeyboardTypeOptions} from 'react-native';

export type RootStackParam = {
  HomeScreen?: {
    screen?: 'Home' | 'Profile';
  };
};
export type NativeProp = BottomTabNavigationProp<RootStackParam>;

export type RootStackParamList1 = {
  Login?: undefined;
  Register?: undefined;
  EditTodo?: undefined;
  EditProfile?: undefined;
  EditPassword?: undefined;
};
export type NavigationProps = NativeStackNavigationProp<RootStackParamList1>;

export type tabScreen = {
  Home?: undefined;
  AddTodo?: undefined;
  Profile?: undefined;
};

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
  createdAt?: Date;
}
export interface TodoData1 {
  id?: string;
  title?: string;
  notes?: string;
  tags?: string;
  createdAt?: string;
}

export interface TodosState {
  todos: TodoData[];
  UpdateTodos: TodoData | null | undefined;
}

export type ButtonProps = {
  onclick: () => void;
  text: string;
};

export type InputProps = {
  text?: string;
  value?: string | undefined;
  onChangeText?: (text: string) => void;
  place: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
};
