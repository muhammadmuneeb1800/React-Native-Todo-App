import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  flexSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  profile: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.secondray,
    lineHeight: 24,
  },
});
