import { useFocusEffect } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { CSpinner } from '../../components';
import { EmptyList } from '../../components/EmptyList';
import { colors, fonts } from '../../styles/base';
import API from '../../utils/Api';
import { ContextApp } from '../../utils/ContextApp';
import { ItemComment } from './ItemComment';

export const DetailPost = ({ route }) => {
  const { postSelected } = useContext(ContextApp);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(true);

  const keyExtractor = (_, index) => 'log' + index;

  const fetchInfo = async () => {
    try {
      let user = await API.user.getUserInfo(postSelected.userId);
      setUser(user);
      let dataComments = await API.comments.getComments(postSelected.id);
      setComments(dataComments);
      setLoading(false);
    } catch (error) {
      console.log(error, 'In service');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchInfo();
    }, []),
  );

  const renderUser = () => {
    return (
      <View style={[{ width: '100%', marginTop: 30 }, styles.marginPage]}>
        <Text style={{ fontSize: 20, fontFamily: fonts.bold }}>User</Text>
        <View style={{ width: '100%', marginTop: 15, flexDirection: 'row', alignContent: 'center' }}>
          <Text style={styles.subTitle}>Name: </Text>
          <Text style={styles.itemDescription}>{user.name}</Text>
        </View>
        <View
          style={{
            width: '100%',
            marginTop: 15,
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
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

  const renderHeaders = () => {
    return (
      <View>
        <View style={styles.marginPage}>
          <Text style={{ fontSize: 20, fontFamily: fonts.bold }}>Description</Text>
          <View style={{ width: '100%', marginTop: 15 }}>
            <Text style={styles.itemDescription}>{postSelected.body}</Text>
          </View>
        </View>
        {user && renderUser()}
        <View style={{ marginTop: 30, backgroundColor: colors.grayLightMid, paddingLeft: 16 }}>
          <Text style={{ fontSize: 19, fontFamily: fonts.bold }}>COMMENTS</Text>
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
          ListHeaderComponent={renderHeaders()}
          keyExtractor={keyExtractor}
          renderItem={({ item, index }) => <ItemComment {...item} key={index} />}
        />
      </View>
    );
  };

  return (
    <View style={{ marginTop: 40 }}>
      <CSpinner loading={loading} />
      {comments && renderComments()}
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
  marginPage: {
    marginHorizontal: 16,
  },
});
