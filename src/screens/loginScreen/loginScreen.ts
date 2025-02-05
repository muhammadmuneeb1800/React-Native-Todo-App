import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';

export const style = StyleSheet.create({
  header: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 30,
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
  wel: {
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
    marginTop: 25,
    marginBottom: 25,
  },
  subDiv: {
    marginTop: 24,
  },
  account: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    justifyContent: 'center',
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
  google: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLORS.light,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
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
