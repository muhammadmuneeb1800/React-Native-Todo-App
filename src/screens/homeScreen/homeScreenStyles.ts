import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    borderColor: COLORS.light,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    height: 45,
  },
  input: {
    width: '90%',
    color: COLORS.black,
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
    color: COLORS.secondray,
  },
  looks: {
    color: COLORS.black,
    marginTop: 9,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '400',
    textAlign: 'center',
    width: 240,
  },
});
