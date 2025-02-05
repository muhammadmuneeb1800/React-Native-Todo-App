import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {ButtonProps} from '../../types/types';
import {COLORS} from '../../constants/colors';

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

const style = StyleSheet.create({
  register: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    textAlign: 'center',
  },
  registerText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  login: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: 9,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginTop: 15,
    textAlign: 'center',
  },
  loginText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
});
