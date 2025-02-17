import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {getUser, resetAuth} from '../../store/slices/authSlice';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../types/types';
import {resetState} from '../../store/slices/todoSlice';
import {style} from './ProfileScreen';

export default function Profile() {
  const user = useAppSelector(store => store.authSlice.user);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const signOut = async () => {
    dispatch(resetState());
    await auth().signOut();
    dispatch(resetAuth());
  };
  return (
    <>
      <View style={style.container}>
        <View>
          <Text style={style.setting}>Settings</Text>
          <View style={style.mainDiv}>
            <View style={style.name}>
              <Image source={require('../../assets/images/profilePhoto.png')} />
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
