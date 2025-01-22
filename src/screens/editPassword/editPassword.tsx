import {View, StyleSheet, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getUser} from '../../store/slices/authSlice';
import {useAppDispatch} from '../../store/store';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {NativeProp} from '../../types/types';

export default function EditProfile() {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');

  const navigation = useNavigation<NativeProp>();

  const dispatch = useAppDispatch();
  const user = auth().currentUser;

  const UpdateHandle = async () => {
    if (!oldPassword && oldPassword.length < 6) {
      Alert.alert(
        'Old Password is required and must be at least 6 characters long',
      );
      return;
    }
    if (!newPassword && newPassword.length < 6) {
      Alert.alert(
        'New Password is required and must be at least 6 characters long',
      );
      return;
    }
    if (!confirmNewPassword && confirmNewPassword.length < 6) {
      Alert.alert(
        'Confirm New Password is required and must be at least 6 characters long',
      );
      return;
    }
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Confirm New Password does not match');
      return;
    }

    if (!user) {
      Alert.alert('User is not logged in');
      return;
    }

    try {
      const credential = auth.EmailAuthProvider.credential(
        user.email!,
        oldPassword,
      );
      await user.reauthenticateWithCredential(credential);
      await user.updatePassword(newPassword);
      Alert.alert('Password Updated Successfully!');
      navigation.navigate('HomeScreen', {screen: 'Profile'});
    } catch (error: any) {
      console.error('Error updating password:', error);
      Alert.alert(
        'Failed to update password:',
        error.message || 'Unknown error',
      );
    }
  };

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
