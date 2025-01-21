import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {CreateUserResponse, UserState, User, update} from '../../types/types';
import {Alert} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// Register The User

export const createUser = createAsyncThunk<CreateUserResponse, User>(
  'user/createUser',
  async user => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        user.email,
        user.password,
      );
      Alert.alert('User is successfully created');
      const fullUser = userCredential.user;
      await firestore().collection('users').doc(fullUser.uid).set({
        fullName: user.fullName,
        email: fullUser.email,
        phone: user.phone,
      });
      return {
        id: fullUser.uid || '',
        fullName: user.fullName || '',
        email: fullUser.email || '',
        phone: user.phone || '',
      };
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert(
          'That email address is already in use! Please try with another email address.',
        );
      }

      if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      }

      if (error.code === 'auth/invalid-password') {
        Alert.alert('Password should be at least 6 characters long!');
      }
      if (error instanceof Error) {
        return console.log({message: error.message});
      } else {
        return console.log({message: 'An unknown error occurred'});
      }
    }
  },
);

// with Google account

export const signInWithGoogle = createAsyncThunk('withGoogle', async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo.data?.idToken as string,
    );
    const userCredential = await auth().signInWithCredential(googleCredential);
    const fullUser = userCredential.user;

    await firestore().collection('users').doc(fullUser.uid).set({
      fullName: fullUser.displayName,
      email: fullUser.email,
      phone: fullUser.phoneNumber,
    });
    Alert.alert('Google Sign-In successful!');
    return userCredential || null;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    Alert.alert('Google Sign-In Error', errorMessage);
  }
});

// Get User credentials

export const getUser = createAsyncThunk('getUser', async () => {
  try {
    const user = auth().currentUser;
    if (user) {
      const docRef = firestore().collection('users').doc(user.uid) || null;
      const doc = (await docRef.get()) || null;
      if (doc.exists) {
        return {
          uid: user.uid,
          id: doc.id,
          fullName: doc.data()?.fullName || '',
          email: doc.data()?.email || '',
          phone: doc.data()?.phone || '',
        };
      } else {
        throw new Error('User not found');
      }
    } else {
      await auth().signOut();
      Alert.alert('Session Expired', 'Please log in again.');
      throw new Error('User not logged in');
    }
  } catch (error: any) {
    throw error;
  }
});

// Update User credentials

export const updateUser = createAsyncThunk(
  'updateUser',
  async (user: update) => {
    try {
      const userRef = firestore().collection('users').doc(user.uid);
      await userRef.update({
        fullName: user.fullName,
        email: user.email,
      });
      return user;
    } catch (error: any) {
      throw error;
    }
  },
);

const initialState: UserState = {
  uid: '',
  fullName: '',
  email: '',
  phone: null,
  password: null,
  user: null,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.fullName = action.payload.fullName || '';
        state.email = action.payload.email || '';
        state.phone = action.payload.phone || null;
        state.user = action.payload || null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.fullName = action.payload.fullName || '';
        state.email = action.payload.email || '';
        state.phone = action.payload.phone || null;
        state.user = action.payload || null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.fullName = action.payload.fullName || '';
        state.email = action.payload.email || '';
      });
  },
});

export default authSlice.reducer;
