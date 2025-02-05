import {View, Image, Text} from 'react-native';
import React from 'react';
import Button from '../../components/button/Button';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../types/types';
import {style} from './getStartScreenStyles';

export default function GetStart() {
  const navigation = useNavigation<NavigationProps>();
  return (
    <View style={style.container}>
      <View style={style.img}>
        <Image source={require('../../assets/images/taskismall.png')} />
      </View>
      <View style={style.img2}>
        <Image source={require('../../assets/images/group.png')} />
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
