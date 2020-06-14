import { StyleSheet } from 'react-native';
import { colors } from './base';

const formStyles = StyleSheet.create({
  inputLabel: {
    textAlign: 'left',
    fontSize: 14,
    width: '100%',
    color: colors.grayDarkLight,
  },
  inputLabelMarginTop: {
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 9,
  },
  inputMultiline: {
    minHeight: 90,
  },
  buttonCancel: {
    backgroundColor: colors.white,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: colors.grayDarkMid,
  },
  buttonCancelDisabledStyle: {
    borderColor: colors.grayDarkMid,
    opacity: 0.3,
  },
});

export default formStyles;
