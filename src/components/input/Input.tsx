import {StyleSheet, Text, TextInput} from 'react-native';
import React from 'react';
import {InputProps} from '../../types/types';

export default function Input(props: InputProps) {
  return (
    <>
      <Text style={style.name}>{props.text}</Text>
      <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        style={style.input}
        editable={props.editable}
        placeholder={props.place}
        placeholderTextColor="#0B0A11B2"
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
