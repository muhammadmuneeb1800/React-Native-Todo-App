import {Alert} from 'react-native';
import {useState} from 'react';
import {useAppDispatch} from '../../store/store';
import {createUser} from '../../store/slices/authSlice';

export default function useRegister() {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<number | null>(null);
  const [password, setPassword] = useState<string>('');
  const [isCheck, setIsCheck] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleRegister = async () => {
    if (!/^[a-zA-Z\s]+$/.test(fullName)) {
      Alert.alert('Full name should only contain letters and spaces!');
      return;
    }
    if (email === '' || email.includes('@') === false) {
      Alert.alert('A valid email is required!');
      return;
    }
    if (!phoneNumber || phoneNumber.toString().length >= 11) {
      Alert.alert('Please enter a valid 10-digit phone number!');
      return;
    }
    if (!password || password.length < 6) {
      Alert.alert('Password should be at least 6 characters long!');
      return;
    }
    if (!isCheck) {
      Alert.alert('Please agree to the Terms & Conditions');
      return;
    }

    const user = {
      fullName,
      email,
      phone: phoneNumber,
      password,
    };

    try {
      await dispatch(createUser(user));
    } catch (error: any) {
      Alert.alert('Error creating user:', error);
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
    isCheck,
    setIsCheck,
    handleRegister,
  };
}
