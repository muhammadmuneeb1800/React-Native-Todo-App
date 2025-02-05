import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';

export const style = StyleSheet.create({
  header: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  join: {
    marginTop: 50,
    color: COLORS.secondray,
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 32,
  },
  nice: {
    fontSize: 14,
    lineHeight: 32,
    color: COLORS.black,
    fontWeight: '400',
  },
  mainDiv: {
    marginTop: 15,
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
    borderColor: COLORS.primary,
  },
  checked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  unchecked: {
    backgroundColor: 'white',
    borderColor: COLORS.primary,
  },
  agre: {
    color: COLORS.secondray,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
  },
  term: {
    color: COLORS.primary,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
  },
  register: {
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    textAlign: 'center',
  },
  registerText: {
    color: 'white',
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
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLORS.light,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
    marginBottom: 10,
  },
  googleText: {
    color: COLORS.secondray,
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
