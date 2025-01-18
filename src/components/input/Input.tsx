import {KeyboardTypeOptions, StyleSheet, Text, TextInput} from 'react-native';
import React from 'react';

type InputProps = {
  text: string;
  value: string;
  onChangeText: (text: string) => void;
  place: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
};

export default function Input(props: InputProps) {
  return (
    <>
      <Text style={style.name}>{props.text}</Text>
      <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        style={style.input}
        placeholder={props.place}
        keyboardType={props.keyboardType || 'default'}
        secureTextEntry={props.secureTextEntry || false}
      />
    </>
  );
}

const style = StyleSheet.create({
  name: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 12,
    color: '#0B0A11',
  },
  input: {
    borderWidth: 1,
    marginTop: 8,
    color: '#0B0A11B2',
    borderColor: '#CBCBCB',
    paddingHorizontal: 15,
    borderRadius: 4,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
  },
});
