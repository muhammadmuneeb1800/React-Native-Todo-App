import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import useLogin from '../../hooks/useLogin/useLogin';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import {signInWithGoogle} from '../../store/slices/authSlice';
import {useAppDispatch} from '../../store/store';
import {NavigationProps} from '../../types/types';

export default function Login() {
  const navigation = useNavigation<NavigationProps>();
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

  const dispatch = useAppDispatch();

  return (
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
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  wel: {
    marginTop: 90,
    color: '#0B0A11',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 32,
  },
  nice: {
    fontSize: 14,
    lineHeight: 32,
    color: '#0B0A11B2',
    fontWeight: '400',
  },
  mainDiv: {
    marginTop: 25,
  },
  subDiv: {
    marginTop: 24,
  },
  account: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    justifyContent: 'center',
  },
  agre: {
    color: '#0B0A11',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
  },
  term: {
    color: '#7EBB4F',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
  },
  google: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#CBCBCB',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  googleText: {
    color: '#0B0A11',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  googleImage: {
    width: 27,
    height: 27,
    resizeMode: 'contain',
  },
});
