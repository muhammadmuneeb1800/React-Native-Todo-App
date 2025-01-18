import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import Splash from '../screens/splash/Splash';
import GetStart from '../screens/getStart/GetStart';
import Login from '../screens/login/Login';
import Register from '../screens/register/Register';
import BottomTabNavigation from './BottomTabNavigation';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Stack.Navigator>
        {isOpen ? (
          <Stack.Screen
            name="Splash"
            options={{headerShown: false}}
            component={Splash}
          />
        ) : (
          <>
            {isAuthenticated ? (
              <Stack.Screen
                name="HomeScreen"
                options={{headerShown: false}}
                component={BottomTabNavigation}
              />
            ) : (
              <>
                <Stack.Screen
                  initialParams={GetStart}
                  name="GetStart"
                  options={{headerShown: false}}
                  component={GetStart}
                />
                <Stack.Screen
                  name="Login"
                  options={{
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                  }}
                  component={Login}
                />
                <Stack.Screen
                  name="Register"
                  options={{
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                  }}
                  component={Register}
                />
              </>
            )}
          </>
        )}
      </Stack.Navigator>
    </>
  );
}
