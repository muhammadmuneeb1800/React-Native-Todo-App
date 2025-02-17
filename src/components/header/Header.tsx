import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {NativeProp} from '../../types/types';
import {style} from './HeaderStyle';

type HeaderProps = {
  title: string;
};
export default function Header({title}: HeaderProps) {
  const navigation = useNavigation<NativeProp>();
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={style.flexSection}>
      <TouchableOpacity onPress={goBack}>
        <Icon name="arrowleft" size={24} color={'#B7B7B7'} />
      </TouchableOpacity>
      <View>
        <Text style={style.profile}>{title}</Text>
      </View>
      <Text> </Text>
    </View>
  );
}
