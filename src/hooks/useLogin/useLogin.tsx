import {Alert} from 'react-native';
import {useState} from 'react';
import auth from '@react-native-firebase/auth';

export default function useLogin() {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    if (!/^[a-zA-Z\s]+$/.test(fullName)) {
      Alert.alert('Full name should only contain letters and spaces!');
      return;
    }
    if (email.trim() === '' || !email.includes('@')) {
      Alert.alert('Email must be included and contain @!');
      return;
    }
    if (phoneNumber.trim() === '' || phoneNumber.length >= 11) {
      Alert.alert('Please enter a valid 10-digit phone number!');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Password should be at least 6 characters long!');
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
