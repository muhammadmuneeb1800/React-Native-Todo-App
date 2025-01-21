import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {getUser} from '../../store/slices/authSlice';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

type RootStackParamList = {
  EditProfile?: undefined;
  EditPassword?: undefined;
};

type NativeProps = NativeStackNavigationProp<RootStackParamList>;

export default function Profile() {
  const user = useAppSelector(store => store.authSlice.user);
  const dispatch = useAppDispatch();

  const navigation = useNavigation<NativeProps>();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const signOut = () => {
    auth()
      .signOut()
      .catch(error => console.error('Error signing out:', error));
  };
  return (
    <>
      <View style={style.container}>
        <View>
          <Text style={style.setting}>Settings</Text>
          <View style={style.mainDiv}>
            <View style={style.name}>
              <Image source={require('../../assets/images/ProfilePhoto.png')} />
              <View>
                <Text style={style.fullName}>{user?.fullName}</Text>
                <Text style={style.email}>{user?.email}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}>
              <Icon name="edit" size={16} color={'#B7B7B7'} />
            </TouchableOpacity>
          </View>
          <Text style={style.about}>About</Text>
          <TouchableOpacity
            style={style.changePassword}
            onPress={() => navigation.navigate('EditPassword')}>
            <Text style={style.change}>Change Password</Text>
            <View>
              <Icon name="angle-right" size={15} color={'#B7B7B7'} />
            </View>
          </TouchableOpacity>
          <View style={style.hr} />
          <TouchableOpacity onPress={signOut}>
            <Text style={style.out}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={style.app}>Todo App</Text>
        </View>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  setting: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    color: '#0B0A11',
    lineHeight: 24,
  },
  mainDiv: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  name: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
    alignItems: 'center',
    marginBottom: 10,
    width: '85%',
  },
  fullName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0B0A11',
    lineHeight: 24,
    width: '90%',
  },
  email: {
    fontSize: 12,
    fontWeight: '400',
    color: '#0B0A1166',
    lineHeight: 16,
    width: '90%',
  },
  about: {
    backgroundColor: '#F0F0F0',
    textAlign: 'center',
    paddingVertical: 10,
    color: '#0B0A1166',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    marginTop: 40,
  },
  changePassword: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginHorizontal: 10,
  },
  change: {
    color: '#0B0A11B2',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
  },
  hr: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 15,
  },
  out: {
    color: '#BA1735',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    marginHorizontal: 15,
    marginTop: 20,
  },
  app: {
    textAlign: 'center',
    color: '#0B0A1133',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
  },
});
