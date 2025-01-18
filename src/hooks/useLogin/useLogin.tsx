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
      auth().signInWithEmailAndPassword(user.email, user.password);
    } catch (error: any) {
      console.log(error, 'errors');
    }
  };

  // const onGoogleButtonPress = async () => {
  //   try {
  //     // Ensure Google Play Services are available
  //     await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

  //     // Perform Google Sign-In
  //     const signInResult = await GoogleSignin.signIn();

  //     // Retrieve the ID token
  //     const idToken = signInResult.idToken;
  //     if (!idToken) {
  //       throw new Error('Google Sign-In failed. No ID token found.');
  //     }

  //     // Create a Google credential with the token
  //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  //     // Sign-in the user with the credential
  //     const userCredential = await auth().signInWithCredential(
  //       googleCredential,
  //     );

  //     Alert.alert('Google Sign-In successful!');
  //     navigation.navigate('HomeScreen');
  //     return userCredential;
  //   } catch (error: any) {
  //     Alert.alert('Google Sign-In Error', error.message);
  //   }
  // };

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
    // onGoogleButtonPress,
  };
}
