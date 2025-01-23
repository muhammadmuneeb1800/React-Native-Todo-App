import {Alert} from 'react-native';
import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {useNavigation} from '@react-navigation/native';
import {NativeProp} from '../../types/types';
import auth from '@react-native-firebase/auth';
import {updateUser} from '../../store/slices/authSlice';

export default function useEditProfile() {
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
    if (!updateEmail || updateEmail.trim() === '') {
      Alert.alert('Please enter an email address');
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(updateEmail)) {
      Alert.alert('Please enter a valid email address');
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
  return {
    updateName,
    setUpdateName,
    updateEmail,
    setUpdateEmail,
    UpdateHandle,
  };
}
