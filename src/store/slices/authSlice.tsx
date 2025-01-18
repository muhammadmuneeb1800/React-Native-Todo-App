import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  CreateUserResponse,
  UserState,
  User,
  // LoginUserResponse,
  // LoginUserInput,
  // FirestoreUserData,
} from '../../types/types';
import {Alert} from 'react-native';

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
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      return {
        id: fullUser.uid,
        fullName: user.fullName,
        email: fullUser.email,
        phone: user.phone,
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

// export const loginUser = createAsyncThunk<LoginUserResponse, LoginUserInput>(
//   'loginUser',
//   async user => {
//     if (user) {
//       const userCredential = await auth().signInWithEmailAndPassword(
//         user.email,
//         user.password,
//       );
//       const fullUser = userCredential.user;
//       const doc = await firestore().collection('users').doc(fullUser.uid).get();
//       const userData = doc.data() as FirestoreUserData;
//       if (
//         userData.fullName === user.fullName &&
//         userData.phone === user.phoneNumber
//       ) {
//         await auth().signInWithEmailAndPassword(user.email, user.password);
//       } else {
//         Alert.alert('Full name or phone number does not match.');
//         return;
//       }
//       if (!doc.exists) {
//         Alert.alert('User data not found in Firestore.');
//         return;
//       }
//       return {
//         uid: fullUser.uid,
//         fullName: userData.fullName,
//         email: userData.email,
//         phone: userData.phone,
//       };
//     }
//     // try {
//     //   const userCredential = await auth().signInWithEmailAndPassword(
//     //     user.email,
//     //     user.password,
//     //   );

//     //   const fullUser = userCredential.user;
//     //   const doc = await firestore().collection('users').doc(fullUser.uid).get();
//     //   const userData = doc.data() as FirestoreUserData;
//     //   console.log('In thunk');
//     //   if (
//     //     userData.fullName !== user.fullName &&
//     //     userData.phone !== user.phoneNumber
//     //   ) {
//     //     try {
//     //       await auth().onAuthStateChanged(user1 => {
//     //         console.log('User1', user1);
//     //       });
//     //       Alert.alert('User found');
//     //     } catch (error) {
//     //       throw error;
//     //     }
//     //   } else {
//     //     Alert.alert('Full name or phone number does not match.');
//     //     return;
//     //   }
//     //   if (!doc.exists) {
//     //     Alert.alert('User data not found in Firestore.');
//     //   }

//     //   console.log('end thunk');
//     //   return {
//     //     uid: fullUser.uid,
//     //     fullName: userData.fullName,
//     //     email: userData.email,
//     //     phone: userData.phone,
//     //   };
//     // } catch (error: any) {
//     //   if (error.code === 'auth/invalid-email') {
//     //     Alert.alert('That email address is invalid!');
//     //   } else if (error.code === 'auth/wrong-password') {
//     //     Alert.alert('Wrong password!');
//     //   } else {
//     //     Alert.alert('An error occurred:', error.message);
//     //   }
//     //   if (error instanceof Error) {
//     //     return console.log({message: error.message});
//     //   } else {
//     //     return console.log({message: 'An unknown error occurred'});
//     //   }
//     // }
//   },
// );

export const getUser = createAsyncThunk('getUser', async () => {
  try {
    const user = auth().currentUser;
    console.log('Current Firebase User:', user);
    if (user) {
      const docRef = firestore().collection('users').doc(user.uid);
      const doc = await docRef.get();
      if (doc.exists) {
        console.log('User Document Data:', doc.data());
        return {
          uid: user.uid,
          id: doc.id,
          fullName: doc.data()?.fullName || 'No Name',
          email: doc.data()?.email || 'No Email',
          phone: doc.data()?.phone || 'No Phone',
        };
      } else {
        console.error('User document not found in Firestore');
        throw new Error('User not found');
      }
    } else {
      console.error('No user logged in');
      throw new Error('User not logged in');
    }
  } catch (error: any) {
    console.error('Error in getUser thunk:', error.message);
    throw error;
  }
});

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
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.fullName = action.payload.fullName || '';
      state.email = action.payload.email || '';
      state.phone = action.payload.phone || null;
      state.user = action.payload || null;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.user = action.payload;
    });
  },
});

export default authSlice.reducer;
