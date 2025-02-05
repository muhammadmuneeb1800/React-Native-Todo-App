import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {NativeProp} from '../../types/types';
import {COLORS} from '../../constants/colors';

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

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  flexSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  profile: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.secondray,
    lineHeight: 24,
  },
});
