import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '../styles/base';

export function LoadingLayout() {
  return (
    <View style={styles.container}>
      <LinearGradient style={styles.gradient} colors={[colors.greenDark, colors.green, colors.greenLight]} />
      <View style={styles.logo}>
        <ActivityIndicator color={colors.white} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    position: 'relative',
    flex: 1,
  },
  gradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    marginBottom: 40,
  },
});
