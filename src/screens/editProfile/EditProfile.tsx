import {View, StyleSheet, Image, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getUser, updateUser} from '../../store/slices/authSlice';
import {useAppDispatch, useAppSelector} from '../../store/store';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {NativeProp} from '../../types/types';

export default function EditProfile() {
  const user = useAppSelector(store => store.authSlice.user);
  const [updateName, setUpdateName] = useState<string | undefined>(
    user?.fullName,
  );
  const [updateEmail, setUpdateEmail] = useState<string | undefined>(
    user?.email,
  );
  const navigation = useNavigation<NativeProp>();
  const dispatch = useAppDispatch();

  const UpdateHandle = () => {
    if (!updateName) {
      Alert.alert('Please enter full name');
      return;
    }

    if (!updateEmail && updateEmail?.includes('@') === false) {
      Alert.alert('Please enter valid email address');
      return;
    }

    const updatUser = {
      uid: auth().currentUser?.uid,
      fullName: updateName,
      email: updateEmail,
    };

    dispatch(updateUser(updatUser));
    Alert.alert('User Updated Successfully!');
    navigation.navigate('HomeScreen', {screen: 'Profile'});
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <View style={style.container}>
      <View>
        <View style={style.ImageCenter}>
          <Image
            style={style.img}
            source={require('../../assets/images/ProfilePhoto.png')}
          />
        </View>
        <View style={style.mainDiv}>
          <View style={style.subDiv}>
            <Input
              text="Full Name"
              place="Full Name"
              value={updateName}
              onChangeText={setUpdateName}
            />
          </View>
          <View style={style.subDiv}>
            <Input
              text="Email Address"
              place="yourname@gmail.com"
              value={updateEmail}
              onChangeText={setUpdateEmail}
              keyboardType="email-address"
            />
          </View>
        </View>
      </View>
      <Button text="Save Changes" onclick={() => UpdateHandle()} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  ImageCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  mainDiv: {
    marginTop: 30,
  },
  subDiv: {
    marginBottom: 20,
  },
});
