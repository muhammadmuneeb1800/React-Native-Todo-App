import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';
import {Provider} from 'react-redux';
import store from './src/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </Provider>
  );
}
