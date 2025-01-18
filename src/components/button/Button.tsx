import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

type ButtonProps = {
  onclick: () => void;
  text: string;
};

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
    backgroundColor: '#7EBB4F',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    textAlign: 'center',
  },
  registerText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  login: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#7EBB4F',
    paddingVertical: 9,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginTop: 15,
    textAlign: 'center',
  },
  loginText: {
    color: '#7EBB4F',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
});
