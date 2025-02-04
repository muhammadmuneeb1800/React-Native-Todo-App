import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  mainDiv: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img: {
    width: 70,
    height: 20,
    resizeMode: 'contain',
  },
  inputDiv: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#B7B7B7',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    height: 45,
  },
  input: {
    width: '90%',
    color: '#0B0A11B2',
  },
  data: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  nodata: {
    marginTop: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notask: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    color: '#0B0A11',
  },
  looks: {
    color: '#0B0A11B2',
    marginTop: 9,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '400',
    textAlign: 'center',
    width: 240,
  },
});
