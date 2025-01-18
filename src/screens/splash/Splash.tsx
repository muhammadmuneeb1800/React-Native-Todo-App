import {View, StyleSheet, Image} from 'react-native';
import React from 'react';

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

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  img: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});
