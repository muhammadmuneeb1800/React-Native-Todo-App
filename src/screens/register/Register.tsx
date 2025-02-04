import {View, Text, TouchableOpacity, Image, Platform} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import useRegister from '../../hooks/useRegister/useRegister';
import {useNavigation} from '@react-navigation/native';
import Input from '../../components/input/Input';
import {signInWithGoogle} from '../../store/slices/authSlice';
import {useAppDispatch} from '../../store/store';
import {NavigationProps} from '../../types/types';
import Header from '../../components/header/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {style} from './register';

export default function Register() {
  const {
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
  } = useRegister();

  const Navigation = useNavigation<NavigationProps>();
  const dispatch = useAppDispatch();

  return (
    <View style={style.header}>
      <Header title="Register" />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={
          Platform.OS === 'android' ? 'handled' : 'always'
        }
        style={style.mainContainer}
        contentContainerStyle={style.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={style.container}>
          <Text style={style.join}>Join us today.</Text>
          <Text style={style.nice}>It's Nice too see you, let's start</Text>
          <View style={style.mainDiv}>
            <View style={style.subDiv}>
              <Input
                text="Full Name"
                value={fullName}
                onChangeText={setFullName}
                place="Input your full name here…"
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
                value={phoneNumber !== null ? String(phoneNumber) : ''}
                onChangeText={text => {
                  const parsedValue = text ? parseFloat(text) : null;
                  setPhoneNumber(parsedValue);
                }}
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
            <View style={style.checkDiv}>
              <View>
                <TouchableOpacity
                  style={[
                    style.checkbox,
                    isCheck ? style.checked : style.unchecked,
                  ]}
                  onPress={() => setIsCheck(!isCheck)}>
                  {isCheck && <Icon name="check" size={15} color="white" />}
                </TouchableOpacity>
              </View>
              <View style={style.agreeDiv}>
                <Text style={style.agre}>I Agree with </Text>
                <Text style={style.term}>Terms & Conditions</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={style.google}
            onPress={() => dispatch(signInWithGoogle())}>
            <Image
              style={style.googleImage}
              source={require('../../assets/images/google.png')}
            />
            <Text style={style.googleText}>Register with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRegister} style={style.register}>
            <Text style={style.registerText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Navigation.navigate('Login')}
            style={style.account}>
            <Text style={style.agre}>Already have Account? </Text>
            <Text style={style.term}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
