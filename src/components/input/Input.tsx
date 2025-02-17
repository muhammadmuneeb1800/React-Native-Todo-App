import {Text, TextInput} from 'react-native';
import React from 'react';
import {InputProps} from '../../types/types';
import {style} from './InputStyle';

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
