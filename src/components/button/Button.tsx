import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {ButtonProps} from '../../types/types';
import { style } from './ButtonStyle';

export default function Button(props: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={props.onclick}
      style={[props.text === 'Register' ? style.login : style.register]}>
      <Text
        style={[
          props.text === 'Register' ? style.loginText : style.registerText,
        ]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}


