import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '../styles/base';

function Loading() {
  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        colors={[colors.blueDark, colors.blueDark, colors.blueMid, colors.blueLight]}
      />
      <View style={styles.logo}>
        <ActivityIndicator />
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

export default Loading;
