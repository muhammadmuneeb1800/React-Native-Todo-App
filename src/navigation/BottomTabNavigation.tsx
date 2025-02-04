import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Octicons';
import {tabScreen} from '../types/types';
import {TABS_STACK} from '../constants/constant.ts';

const Tab = createBottomTabNavigator<tabScreen>();

const TabBarIcon = ({name, color}: {name: string; color: string}) => {
  return <Icon name={name} size={23} color={color} />;
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
        tabBarActiveTintColor: '#7EBB4F',
      }}>
      {TABS_STACK.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: () => (
              <TabBarIcon name={tab.icon} color={'#7EBB4F'} />
            ),
            tabBarLabelStyle: {fontSize: 12, fontWeight: 'bold'},
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
