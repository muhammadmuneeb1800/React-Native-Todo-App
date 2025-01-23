import {View, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {getUser} from '../../store/slices/authSlice';
import {useAppDispatch} from '../../store/store';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import useEditPassword from '../../hooks/useEditPassword/useEditPassword';

export default function EditProfile() {
  const {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    UpdateHandle,
  } = useEditPassword();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <View style={style.container}>
      <View style={style.mainDiv}>
        <View style={style.subDiv}>
          <Input
            text="Old Password"
            place="Old Password"
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry={true}
          />
        </View>
        <View style={style.subDiv}>
          <Input
            text="New Password"
            place="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={true}
          />
        </View>
        <View style={style.subDiv}>
          <Input
            text="Confirm New Password"
            place="Confirm New Password"
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
            secureTextEntry={true}
          />
        </View>
      </View>
      <Button text="Save Changes" onclick={UpdateHandle} />
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
  mainDiv: {
    marginTop: 50,
  },
  subDiv: {
    marginBottom: 20,
  },
});
