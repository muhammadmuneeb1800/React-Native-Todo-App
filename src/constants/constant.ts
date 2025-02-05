import useEditPassword from '../hooks/useEditPassword/useEditPassword';
import BottomTabNavigation from '../navigation/BottomTabNavigation';
import AddTodo from '../screens/addTodoScreen/AddTodoScreen.tsx';
import EditProfile from '../screens/editProfileScreen/EditProfileScreen.tsx';
import EditTodo from '../screens/editTodoScreen/EditTodoScreen.tsx';
import GetStart from '../screens/getStartScreen/GetStartScreen.tsx';
import Home from '../screens/homeScreen/HomeScreen.tsx';
import Login from '../screens/loginScreen/LoginScreen.tsx';
import Profile from '../screens/profileScreen/ProfileScreen.tsx';
import Register from '../screens/registerScreen/RegisterScreen.tsx';
import {tabScreenTab} from '../types/types.ts';

export const AUTH_STACK = [
  {name: 'HomeScreen', component: BottomTabNavigation},
  {name: 'EditProfile', component: EditProfile},
  {name: 'EditTodo', component: EditTodo},
  {name: 'EditPassword', component: useEditPassword},
];

export const GUEST_STACK = [
  {name: 'GetStart', component: GetStart, initialParams: GetStart},
  {name: 'Login', component: Login},
  {name: 'Register', component: Register},
];

export const TABS_STACK: tabScreenTab[] = [
  {name: 'Home', component: Home, icon: 'home'},
  {name: 'AddTodo', component: AddTodo, icon: 'home'},
  {name: 'Profile', component: Profile, icon: 'home'},
];


