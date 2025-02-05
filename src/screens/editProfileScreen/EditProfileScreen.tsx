import {View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {getUser} from '../../store/slices/authSlice';
import {useAppDispatch} from '../../store/store';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import useEditProfile from '../../hooks/useEditProfile/useEditProfile';
import Header from '../../components/header/Header';
import {style} from './editProfileScreenStyles';
export default function EditProfile() {
  const dispatch = useAppDispatch();
  const {
    updateName,
    setUpdateName,
    updateEmail1,
    setUpdateEmail1,
    updateHandle,
  } = useEditProfile();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <View style={style.container}>
      <View>
        <Header title="Edit Profile" />
        <View style={style.ImageCenter}>
          <Image
            style={style.img}
            source={require('../../assets/images/profilePhoto.png')}
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
              editable={false}
              selectTextOnFocus={false}
              value={updateEmail1}
              onChangeText={setUpdateEmail1}
              keyboardType="email-address"
            />
          </View>
        </View>
      </View>
      <Button text="Save Changes" onclick={() => updateHandle()} />
    </View>
  );
}
