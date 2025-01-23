import {Alert} from 'react-native';
import {useState} from 'react';
import {NativeProp} from '../../types/types';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

export default function useEditPassword() {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const navigation = useNavigation<NativeProp>();

  const user = auth().currentUser;

  const UpdateHandle = async () => {
    if (!oldPassword) {
      Alert.alert('Old password is required');
      return;
    }
    if (oldPassword.length < 6) {
      Alert.alert('Old password must be at least 6 characters long');
      return;
    }
    if (!newPassword) {
      Alert.alert('New password is required');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('New password must be at least 6 characters long');
      return;
    }
    if (!confirmNewPassword) {
      Alert.alert('Please confirm your new password');
      return;
    }
    if (confirmNewPassword.length < 6) {
      Alert.alert('Confirm new password must be at least 6 characters long');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      Alert.alert('New password and confirm password do not match');
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
  return {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    UpdateHandle,
  };
}
