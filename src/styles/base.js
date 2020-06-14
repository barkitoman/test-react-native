import { Dimensions } from 'react-native';

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
  fullScreenHeight: Dimensions.get('screen').height,
};

export const colors = {
  //Colors
  yellow: '#F0D506',
  white: '#FFFFFF',
  red: '#fe3f38',
  grayDark: '#3A4555',
  grayLightMid: '#b2b2b2',
  grayLight: '#B7B7B9',
  green: '#0CAF0F',
  greenDark: '#08630A',
  greenLight: '#12EC16',
  blue: '#007ffb',
};

export const fonts = {
  primary: 'poppins-regular',
  bold: 'poppins-bold',
};

export const flex1 = {
  flex: 1,
};

export const whiteBox = {
  paddingVertical: 28,
  paddingHorizontal: 18,
  backgroundColor: colors.white,
  borderRadius: 10,
};
