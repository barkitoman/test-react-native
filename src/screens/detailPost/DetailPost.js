import { useFocusEffect } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { EmptyList, ItemComment } from '../../components';
import { colors, fonts } from '../../styles/base';
import API from '../../utils/Api';
import { ContextApp } from '../../utils/ContextApp';

export const DetailPost = ({ route }) => {
  const { postSelected } = useContext(ContextApp);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState(null);

  const keyExtractor = (_, index) => 'log' + index;

  const fetchUserInfo = async () => {
    try {
      let user = await API.user.getUserInfo(postSelected.userId);
      setUser(user);
      let dataComments = await API.comments.getComments(postSelected.id);
      console.log(dataComments);
      setComments(dataComments);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserInfo();
    }, []),
  );

  const renderUser = () => {
    return (
      <View style={{ width: '100%', marginTop: 30 }}>
        <Text style={{ fontSize: 20, fontFamily: fonts.bold }}>User</Text>
        <View style={{ width: '100%', marginTop: 15, flexDirection: 'row', alignContent: 'center' }}>
          <Text style={styles.subTitle}>Name: </Text>
          <Text style={styles.itemDescription}>{user.name}</Text>
        </View>
        <View style={{ width: '100%', marginTop: 15, flexDirection: 'row', alignContent: 'center' }}>
          <Text style={styles.subTitle}>Email: </Text>
          <Text style={styles.itemDescription}>{user.email} </Text>
        </View>
        <View style={{ width: '100%', marginTop: 15, flexDirection: 'row', alignContent: 'center' }}>
          <Text style={styles.subTitle}>Phone: </Text>
          <Text style={styles.itemDescription}>{user.phone} </Text>
        </View>
        <View style={{ width: '100%', marginTop: 15, flexDirection: 'row', alignContent: 'center' }}>
          <Text style={styles.subTitle}>Website: </Text>
          <Text style={styles.itemDescription}>{user.website} </Text>
        </View>
      </View>
    );
  };

  const renderComments = () => {
    return (
      <View style={styles.containerComments}>
        <FlatList
          nestedScrollEnabled
          style={styles.headerList}
          data={comments}
          removeClippedSubviews={true}
          ListEmptyComponent={<EmptyList info="No comments" />}
          // stickyHeaderIndices={[0]}
          keyExtractor={keyExtractor}
          renderItem={({ item, index }) => <ItemComment {...item} key={index} />}
        />
      </View>
    );
  };

  return (
    <View style={{ marginHorizontal: 16, marginTop: 40 }}>
      <ScrollView alwaysBounceVertical={false}>
        <View>
          <Text style={{ fontSize: 20, fontFamily: fonts.bold }}>Description</Text>
          <View style={{ width: '100%', marginTop: 15 }}>
            <Text style={styles.itemDescription}>{postSelected.body}</Text>
          </View>
        </View>
        {user && renderUser()}
        {comments && renderComments()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  itemDescription: {
    fontFamily: fonts.primary,
    color: colors.grayDark,
  },
  subTitle: {
    color: colors.grayDark,
    fontSize: 17,
    fontWeight: '600',
  },
});
