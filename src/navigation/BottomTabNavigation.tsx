import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import AddTodo from '../screens/addTodo/AddTodo';
import Icon from 'react-native-vector-icons/Octicons';
import Profile from '../screens/profile/Profile';
import {tabScreen} from '../types/types';

const Tab = createBottomTabNavigator<tabScreen>();

const TabBarIcon = ({name}: {name: string}) => {
  return <Icon name={name} size={23} />;
};

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 0,
          height: 67,
        },
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => <TabBarIcon name="home" />,
        }}
      />
      <Tab.Screen
        name="AddTodo"
        component={AddTodo}
        options={{
          tabBarIcon: () => <TabBarIcon name="home" />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => <TabBarIcon name="home" />,
        }}
      />
    </Tab.Navigator>
  );
}
