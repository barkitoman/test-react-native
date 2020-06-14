import { Dimensions } from 'react-native';

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
  fullScreenHeight: Dimensions.get('screen').height,
};

export const colors = {
  grayLighter: '#F5F7FA',
  grayLight: '#F4F5F8',
  grayLightMid: '#CCCCCC',
  grayDarkLightMid: '#CED5E2',
  grayDarkMid: '#A3B0C4',
  grayDarkLight: '#404D66',
  grayChip: '#E5EBEF',
  black: '#000000',
  blueDark: '#0B2B57',
  blueMid: '#004485',
  blueLight: '#0178C3',
  blueDisabled: '#007aff',
  blueItalic: '#0164C3',
  blueSolid: '#8299BD',
  darkLight: '#002B5414',
  whiteLight: '#0ADCEF24',

  //Colors
  yellow: '#F0D506',
  white: '#FFFFFF',
  red: '#fe3f38',
  grayDark: '#3A4555',
  green: '#0CAF0F',
  greenDark: '#08630A',
  greenLight: '#12EC16',
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
