import {View, StyleSheet, Image, Text} from 'react-native';
import React from 'react';
import Button from '../../components/button/Button';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../types/types';

export default function GetStart() {
  const navigation = useNavigation<NavigationProps>();
  return (
    <View style={style.container}>
      <View style={style.img}>
        <Image source={require('../../assets/images/taskismall.png')} />
      </View>
      <View style={style.img2}>
        <Image source={require('../../assets/images/Group.png')} />
      </View>
      <View>
        <Text style={style.start}>Start with taski</Text>
        <Text style={style.join}>
          Join us now and get your daily things right
        </Text>
        <View style={style.btns}>
          <Button onclick={() => navigation.navigate('Login')} text="Login" />
          <Button
            onclick={() => navigation.navigate('Register')}
            text="Register"
          />
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 40,
    paddingTop: 60,
  },
  img: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  img2: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  start: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    color: '#0B0A11',
    textAlign: 'center',
  },
  join: {
    marginTop: 5,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    color: '#0B0A11',
    textAlign: 'center',
  },
  btns: {
    marginTop: 40,
  },
});
