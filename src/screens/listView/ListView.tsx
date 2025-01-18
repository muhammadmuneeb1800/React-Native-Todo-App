import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function ListView() {
  return (
    <View style={style.container}>
      <Text>ListView</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
