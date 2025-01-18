import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

export default function EditProfile() {
  return (
    <View style={style.container}>
      <Text style={style.title}>Edit Profile</Text>
      <View style={style.ImageCenter}>
        <Image
          style={style.img}
          source={require('../../assets/images/ProfilePhoto.png')}
        />
      </View>
      <View style={style.mainDiv}>
        <View style={style.subDiv}>
          <Text style={style.name}>Full Name</Text>
          <TextInput style={style.input} placeholder="Full Name" />
        </View>
        <View style={style.subDiv}>
          <Text style={style.name}>Email Address</Text>
          <TextInput style={style.input} placeholder="yourname@email.com" />
        </View>
      </View>
      <TouchableOpacity style={style.addTask}>
        <Text style={style.addText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 24,
  },
  ImageCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  mainDiv: {
    marginTop: 60,
  },
  subDiv: {
    marginBottom: 20,
  },
  name: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: '#0B0A11',
  },
  input: {
    marginTop: 8,
    width: '100%',
    borderColor: '#CBCBCB',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    height: 45,
    fontSize: 14,
    fontWeight: '400',
    color: '#0B0A11',
    lineHeight: 18,
  },
  addTask: {
    backgroundColor: '#7EBB4F',
    borderWidth: 1,
    borderColor: '#7EBB4F',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginTop: 220,
    textAlign: 'center',
  },
  addText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
});
