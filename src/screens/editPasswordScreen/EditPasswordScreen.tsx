import {View} from 'react-native';
import React, {useEffect} from 'react';
import {getUser} from '../../store/slices/authSlice';
import {useAppDispatch} from '../../store/store';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import useEditPassword from '../../hooks/useEditPassword/useEditPassword';
import Header from '../../components/header/Header';
import {style} from './EditPasswordScreenStyles';

export default function EditPassword() {
  const dispatch = useAppDispatch();
  const {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    updateHandle,
  } = useEditPassword();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <View style={style.container}>
      <View>
        <Header title="Edit Password" />
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
      </View>
      <Button text="Save Changes" onclick={updateHandle} />
    </View>
  );
}
