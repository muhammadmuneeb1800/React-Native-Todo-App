import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import SplashScreen from '../screens/splashScreen/SplashScreen';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AUTH_STACK, GUEST_STACK} from '../constants/constant';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (!currentUser) {
      auth().signOut();
    }
    if (currentUser) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    const unsubscribe = auth().onAuthStateChanged(user => {
      user?.reload();
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '335818406935-7uhglnrai1ha9pocfrsqvp2vv73cq3uv.apps.googleusercontent.com',
    });
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
            component={SplashScreen}
          />
        ) : (
          <>
            {isAuthenticated
              ? AUTH_STACK.map(({name, component}) => (
                  <Stack.Screen
                    key={name}
                    name={name}
                    component={component}
                    options={{headerShown: false}}
                  />
                ))
              : GUEST_STACK.map(({name, component, initialParams}) => (
                  <Stack.Screen
                    key={name}
                    name={name}
                    component={component}
                    options={{headerShown: false}}
                    initialParams={initialParams}
                  />
                ))}
          </>
        )}
      </Stack.Navigator>
    </>
  );
}
