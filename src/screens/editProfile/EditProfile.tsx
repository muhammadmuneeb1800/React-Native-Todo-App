import {View, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import {getUser} from '../../store/slices/authSlice';
import {useAppDispatch} from '../../store/store';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import useEditProfile from '../../hooks/useEditProfile/useEditProfile';

export default function EditProfile() {
  const {updateName, setUpdateName, updateEmail, setUpdateEmail, UpdateHandle} =
    useEditProfile();

  const dispatch = useAppDispatch();

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
