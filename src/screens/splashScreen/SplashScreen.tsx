import {View, Image} from 'react-native';
import React from 'react';
import {style} from './SplashScreenStyle';
export default function SplashScreen() {
  return (
    <View style={style.container}>
      <Image
        style={style.img}
        source={require('../../assets/images/taski.png')}
      />
    </View>
  );
}
