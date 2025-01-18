import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {getUser} from '../../store/slices/authSlice';

export default function Profile() {
  const user = useAppSelector(store => store.authSlice.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
      })
      .catch(error => console.error('Error signing out:', error));
  };
  return (
    <>
      <View style={style.container}>
        <Text style={style.setting}>Settings</Text>
        <View style={style.mainDiv}>
          <View style={style.name}>
            <Image source={require('../../assets/images/ProfilePhoto.png')} />
            <View>
              <Text>{user?.fullName}</Text>
              <Text>{user?.email}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Icon name="edit" size={16} color={'#B7B7B7'} />
          </TouchableOpacity>
        </View>
        <Text style={style.about}>About</Text>
        <TouchableOpacity style={style.changePassword}>
          <Text style={style.change}>Change Password</Text>
          <View>
            <Icon name="angle-right" size={15} color={'#B7B7B7'} />
          </View>
        </TouchableOpacity>
        <View style={style.hr} />
        <TouchableOpacity onPress={signOut}>
          <Text style={style.out}>Sign Out</Text>
        </TouchableOpacity>
        <Text style={style.app}>Todo App</Text>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
  name: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    alignItems: 'center',
    marginBottom: 10,
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
    marginTop: '104%',
    textAlign: 'center',
    color: '#0B0A1133',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
  },
});
