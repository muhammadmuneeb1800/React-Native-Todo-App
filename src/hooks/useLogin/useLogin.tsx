import {Alert} from 'react-native';
import {useState} from 'react';
import auth from '@react-native-firebase/auth';

export default function useLogin() {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<number | null>(null);
  const [password, setPassword] = useState<string>('');

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

    const user = {
      fullName,
      email,
      phoneNumber,
      password,
    };

    try {
      auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
          Alert.alert('Login successful!');
        });
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') {
        Alert.alert('Invalid email address. Please check and try again.');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Wrong password. Please try again.');
      } else if (error.code === 'auth/user-not-found') {
        Alert.alert('No account found with this email. Please register first.');
      } else {
        Alert.alert('An error occurred:', error.message || 'Unknown error.');
      }
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
