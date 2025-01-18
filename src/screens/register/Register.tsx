import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useRegister from '../../hooks/useRegister/useRegister';
import {useNavigation} from '@react-navigation/native';
import Input from '../../components/input/Input';

type RootState = {
  Login?: undefined;
  Register?: undefined;
};

type Navigation = NativeStackNavigationProp<RootState>;

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

  const Navigation = useNavigation<Navigation>();

  return (
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
      <TouchableOpacity style={style.google}>
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
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    flex: 1,
  },
  join: {
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
  checkDiv: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  agreeDiv: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#7EBB4F',
  },
  checked: {
    backgroundColor: '#7EBB4F',
    borderColor: '#7EBB4F',
  },
  unchecked: {
    backgroundColor: '#fff',
    borderColor: '#7EBB4F',
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
  register: {
    backgroundColor: '#7EBB4F',
    borderWidth: 1,
    borderColor: '#7EBB4F',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    textAlign: 'center',
  },
  registerText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  account: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    justifyContent: 'center',
  },
  google: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#CBCBCB',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginTop: 60,
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
