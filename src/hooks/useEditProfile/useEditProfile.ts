import {Alert} from 'react-native';
import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {useNavigation} from '@react-navigation/native';
import {NativeProp} from '../../types/types';
import auth from '@react-native-firebase/auth';
import {updateUser} from '../../store/slices/authSlice';

export default function useEditProfile() {
  const user = useAppSelector(store => store.authSlice.user);
  const dispatch = useAppDispatch();
  const [updateName, setUpdateName] = useState<string | undefined>(
    user?.fullName,
  );
  const [updateEmail1, setUpdateEmail1] = useState<string | undefined>(
    user?.email,
  );
  const navigation = useNavigation<NativeProp>();

  const updateHandle = async () => {
    if (!updateName || updateName.trim() === '') {
      Alert.alert('Please enter a valid full name');
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(updateName)) {
      Alert.alert('Full name must only contain letters and spaces');
      return;
    }
    if (updateName.trim().length < 3) {
      Alert.alert('Full name should be at least 3 characters long');
      return;
    }
    if (!updateEmail1 || updateEmail1.trim() === '') {
      Alert.alert('Please enter an email address');
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(updateEmail1)) {
      Alert.alert('Please enter a valid email address');
      return;
    }

    const updatedUser = {
      uid: auth().currentUser?.uid,
      fullName: updateName,
    };

    try {
      dispatch(updateUser(updatedUser));
      Alert.alert('User Updated Successfully!');
      navigation.navigate('HomeScreen', {screen: 'Profile'});
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.message || 'Failed to update profile. Please try again.',
      );
    }
  };

  return {
    updateName,
    setUpdateName,
    updateEmail1,
    setUpdateEmail1,
    updateHandle,
  };
}
