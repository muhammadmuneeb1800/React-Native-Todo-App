import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';

export const style = StyleSheet.create({
  name: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 12,
    color: COLORS.secondray,
  },
  input: {
    borderWidth: 1,
    marginTop: 8,
    color: COLORS.black,
    borderColor: COLORS.light,
    paddingHorizontal: 15,
    borderRadius: 4,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
  },
});
