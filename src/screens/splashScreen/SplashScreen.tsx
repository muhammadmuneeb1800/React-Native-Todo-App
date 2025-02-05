import {View, Image} from 'react-native';
import React from 'react';
import {style} from './splashScreen';
export default function Splash() {
  return (
    <View style={style.container}>
      <Image
        style={style.img}
        source={require('../../assets/images/taski.png')}
      />
    </View>
  );
}
