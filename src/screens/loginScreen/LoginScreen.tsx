import {View, Text, TouchableOpacity, Image, Platform} from 'react-native';
import React from 'react';
import useLogin from '../../hooks/useLogin/useLogin';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import {signInWithGoogle} from '../../store/slices/authSlice';
import {useAppDispatch} from '../../store/store';
import {NavigationProps} from '../../types/types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../components/header/Header';
import {style} from './LoginScreen';

export default function Login() {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useAppDispatch();
  const {
    fullName,
    setFullName,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    password,
    setPassword,
    handleLogin,
  } = useLogin();

  return (
    <View style={style.header}>
      <Header title="Login" />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={
          Platform.OS === 'android' ? 'handled' : 'always'
        }
        style={style.mainContainer}
        contentContainerStyle={style.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={style.container}>
          <View>
            <Text style={style.wel}>Welcome Back.</Text>
            <Text style={style.nice}>
              It's Nice too see you again, let's get going
            </Text>
            <View style={style.mainDiv}>
              <View style={style.subDiv}>
                <Input
                  text="Full Name"
                  value={fullName}
                  onChangeText={setFullName}
                  place="Input your full name here..."
                />
              </View>
              <View style={style.subDiv}>
                <Input
                  text="Email Address"
                  value={email}
                  onChangeText={setEmail}
                  place="yourname@email.com"
                  keyboardType="email-address"
                />
              </View>
              <View style={style.subDiv}>
                <Input
                  text="Phone Number"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  place="Input your phone number here..."
                  keyboardType="numeric"
                />
              </View>
              <View style={style.subDiv}>
                <Input
                  text="Password"
                  value={password}
                  onChangeText={setPassword}
                  place="Input password here..."
                  secureTextEntry={true}
                />
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={style.google}
              onPress={() => dispatch(signInWithGoogle())}>
              <Image
                style={style.googleImage}
                source={require('../../assets/images/google.png')}
              />
              <Text style={style.googleText}>Login with Google</Text>
            </TouchableOpacity>
            <Button onclick={handleLogin} text="Login" />
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              style={style.account}>
              <Text style={style.agre}>Don't have an Account? </Text>
              <Text style={style.term}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
