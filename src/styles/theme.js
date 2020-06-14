import { colors, fonts } from './base';

export const theme = {
  Button: {
    containerStyle: {
      width: '100%',
    },
    buttonStyle: {
      backgroundColor: colors.green,
      borderRadius: 26,
    },
    titleStyle: {
      fontFamily: fonts.primary,
      color: colors.white,
      fontSize: 18,
    },
    disabledStyle: {
      backgroundColor: colors.green,
      opacity: 0.3,
    },
    disabledTitleStyle: {
      fontFamily: fonts.primary,
      color: colors.white,
      fontSize: 18,
    },
  },

  Text: {
    style: {
      fontFamily: fonts.primary,
      color: colors.grayDark,
      fontSize: 16,
      textAlign: 'center',
    },
  },

  Input: {
    containerStyle: {
      paddingHorizontal: 0,
    },
    inputStyle: {
      fontFamily: fonts.primary,
      fontSize: 14,
      color: colors.blueDark,
      height: '100%',
    },
    inputContainerStyle: {
      borderWidth: 1,
      backgroundColor: colors.white,
      borderRadius: 5,
      borderColor: colors.grayDarkMid,
      paddingHorizontal: 16,
    },
  },

  CheckBox: {
    containerStyle: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      width: '100%',
      margin: 0,
      padding: 0,
      marginLeft: 0,
      paddingLeft: 0,
      // marginBottom: 0,
      // paddingBottom: 0,
    },
    textStyle: {
      fontSize: 14,
      color: colors.grayDarkLight,
    },
  },
};
