import useEditPassword from '../hooks/useEditPassword/useEditPassword';
import BottomTabNavigation from '../navigation/BottomTabNavigation';
import AddTodo from '../screens/addTodo/AddTodo.tsx';
import EditProfile from '../screens/editProfile/EditProfile.tsx';
import EditTodo from '../screens/editTodo/EditTodo.tsx';
import GetStart from '../screens/getStart/GetStart.tsx';
import Home from '../screens/home/Home.tsx';
import Login from '../screens/login/Login.tsx';
import Profile from '../screens/profile/Profile.tsx';
import Register from '../screens/register/Register.tsx';
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
