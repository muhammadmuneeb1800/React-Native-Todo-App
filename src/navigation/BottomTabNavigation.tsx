import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import AddTodo from '../screens/addTodo/AddTodo';
import Icon from 'react-native-vector-icons/Octicons';
import Profile from '../screens/profile/Profile';

type tabScreen = {
  HomeScreen: undefined;
  AddTodo: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<tabScreen>();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 0,
          height: 67,
        },
        tabBarHideOnKeyboard: true,
        tabBarIcon: () => <Icon name="home" size={23} />,
      }}>
      <Tab.Screen name="HomeScreen" component={Home} />
      <Tab.Screen name="AddTodo" component={AddTodo} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
