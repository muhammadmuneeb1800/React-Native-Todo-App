import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 40,
    paddingTop: 60,
  },
  img: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  img2: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  start: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    color: COLORS.secondray,
    textAlign: 'center',
  },
  join: {
    marginTop: 5,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    color: COLORS.secondray,
    textAlign: 'center',
  },
  btns: {
    marginTop: 40,
  },
});
