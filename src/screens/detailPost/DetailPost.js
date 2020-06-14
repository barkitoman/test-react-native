import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { fonts } from '../../styles/base';

export const DetailPost = () => {
  return (
    <View style={{ margin: 16 }}>
      <ScrollView alwaysBounceVertical={false}>
        <Text style={{ fontSize: 20, fontFamily: fonts.bold }}>Description</Text>
        <View style={{ width: '90%' }}>
          <Text style={styles.itemDescription}>body</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  itemDescription: {},
});
