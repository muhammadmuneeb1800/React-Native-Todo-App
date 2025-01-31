import {Alert} from 'react-native';
import {useState} from 'react';
import {loginUser} from '../../store/slices/authSlice';
import {useAppDispatch} from '../../store/store';

export default function useLogin() {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<number | null>(null);
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    if (fullName.trim() === '') {
      Alert.alert('Full name is required!');
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(fullName)) {
      Alert.alert('Full name should only contain letters and spaces!');
      return;
    }
    if (fullName.length < 5) {
      Alert.alert('Full name should be at least 5 characters long!');
      return;
    }
    if (email.trim() === '') {
      Alert.alert('Email is required!');
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Please enter a valid email address!');
      return;
    }
    if (phoneNumber === null || phoneNumber.toString().length !== 10) {
      Alert.alert('Please enter a valid 10-digit phone number!');
      return;
    }
    if (password === '') {
      Alert.alert('Password is required!');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Password should be at least 6 characters long!');
      return;
    }
    if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
      Alert.alert('Password should contain both letters and numbers!');
      return;
    }

    try {
      dispatch(loginUser({email, password}));
    } catch (error: any) {
      Alert.alert('Error login user:', error);
    }
  };

  return {
    fullName,
    setFullName,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    password,
    setPassword,
    handleLogin,
  };
}
