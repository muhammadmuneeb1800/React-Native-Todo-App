import {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';

type navigationApp = NativeStackNavigationProp<{
  Home: undefined;
  Login: undefined;
  Register: undefined;
}>;

export default function useAuth() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const navigate = useNavigation<navigationApp>();

  // Listen to auth state change (to manage user session)
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        setIsAuthenticated(true);
        navigate.navigate('Home');
      } else {
        setIsAuthenticated(false);
        navigate.navigate('Login');
      }
    });
    return subscriber;
  }, [navigate]);

  // Handle user registration
  const handleRegister = async () => {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('User account created and signed in!');
        navigate.navigate('Login');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }

        if (error.code === 'auth/weak-password') {
          Alert.alert('Password is too weak!');
        }

        // console.error(error);
      });
  };

  // Handle user SignIn with Google Account

  // const handleGoogleSignIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     const googleCredential = auth.GoogleAuthProvider.credential(
  //       userInfo.idToken,
  //     );
  //     await auth().signInWithCredential(googleCredential);
  //     Alert.alert('Google Sign-In Successful');
  //   } catch (error) {
  //     Alert.alert('Google Sign-In Error', error.message);
  //   }
  // };

  // Handle user login
  const handleLogin = async () => {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('User logged in successfully!');
        navigate.navigate('Home');
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          Alert.alert('No user found with this email!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }

        if (error.code === 'auth/wrong-password') {
          Alert.alert('Incorrect password!');
        }

        // console.error(error);
      });
  };

  // Handle user logout
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        Alert.alert('User logged out successfully!');
        navigate.navigate('Login');
      });
    // .catch(error => {
    //   console.error(error);
    // });
  };

  return {
    email,
    password,
    fullName,
    phoneNumber,
    setEmail,
    setPassword,
    setFullName,
    setPhoneNumber,
    handleRegister,
    handleLogin,
    handleLogout,
    isAuthenticated,
    // handleGoogleSignIn,
  };
}
