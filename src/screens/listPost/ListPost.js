import React, { useContext, useEffect, useReducer } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { CSpinner } from '../../components';
import { EmptyList } from '../../components/EmptyList';
import { InputSearch } from '../../components/InputSearch';
import { colors } from '../../styles/base';
import { ContextApp } from '../../utils/ContextApp';
import { ItemPostList } from './ItemPostList';

const ListPost = () => {
  const initalSt = { ...initialState };
  const [state, dispatch] = useReducer(reducer, initalSt);
  const { loading, dataPostsList, requestDataPosts } = state;
  const { posts } = useContext(ContextApp);

  const triggerDispatch = (type, payload) => {
    dispatch({ type, payload });
  };

  const keyExtractor = (_, index) => 'log' + index;

  const onChangeSearch = (value) => {
    searchFilter(value);
  };

  const searchFilter = (text) => {
    if (text != '') {
      const newData = requestDataPosts.filter((item) => {
        const itemData = `${item.body.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      triggerDispatch(SET_DATA_POSTS_LIST, newData);
    } else {
      triggerDispatch(SET_DATA_POSTS_LIST, requestDataPosts);
    }
  };

  const updatePosts = async () => {
    if (posts) {
      let parsePost = parseData(posts);
      triggerDispatch(SET_REQUEST, parsePost);
    }
    triggerDispatch(SET_LOADING, false);
  };

  const parseData = (posts) => {
    let count = 0;
    const post = posts.map((item, i) => {
      if (i < 20) {
        const newItem = item;
        newItem.wasReading = false;
        return newItem;
      } else {
        const newItem = item;
        newItem.wasReading = true;
        return newItem;
      }
    });

    return post;
  };

  const handleSetPostRead = (id) => {
    const postsUpdated = requestDataPosts.map((item) => {
      if (item.id == id) {
        item.wasReading = true;
      }
      return item;
    });
    triggerDispatch(SET_REQUEST, postsUpdated);
  };

  useEffect(() => {
    updatePosts();
  }, [posts]);

  return (
    <View style={styles.content}>
      <CSpinner loading={loading} />
      <InputSearch onChange={onChangeSearch} reloadItems={updatePosts}></InputSearch>

      <View style={styles.listContainer}>
        {!loading && (
          <FlatList
            style={styles.headerList}
            data={dataPostsList}
            removeClippedSubviews={true}
            ListEmptyComponent={<EmptyList info={listFacilitiesStrings.withoutData} />}
            // stickyHeaderIndices={[0]}
            keyExtractor={keyExtractor}
            renderItem={({ item, index }) => (
              <ItemPostList {...item} key={index} setPostRead={handleSetPostRead} />
            )}
          />
        )}
      </View>
    </View>
  );
};

const initialState = {
  loading: true,
  dataPostsList: undefined,
  requestDataPosts: undefined,
};

const ACTIONS = {
  SET_LOADING: 'setLoading',
  SET_DATA_POSTS_LIST: 'setPostList',
  SET_REQUEST: 'setRequestPosts',
};

const { SET_LOADING, SET_DATA_POSTS_LIST, SET_REQUEST } = ACTIONS;

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADING:
      return { ...state, loading: payload };
    case SET_DATA_POSTS_LIST:
      return { ...state, dataPostsList: payload };
    case SET_REQUEST:
      return { ...state, requestDataPosts: payload, dataPostsList: payload };
  }
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentInputSearch: {
    backgroundColor: colors.blueDark,
    paddingBottom: 11,
    paddingTop: 11,
    paddingLeft: 16,
    paddingRight: 16,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.grayDarkLightMid,
    paddingBottom: 10,
  },
  headerText: {
    color: colors.grayDarkLight,
    fontSize: 13,
    flex: 1,
    textAlign: 'left',
  },
  headerList: {},
  separator: {
    height: 1,
    width: '100%',
    marginBottom: 20,
    backgroundColor: colors.white,
  },
  containerSelect: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  listContainer: {
    flex: 1,
  },
  headerItems: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '35%',
    marginRight: 5,
  },
});

const listFacilitiesStrings = {
  withoutData: 'No available Post',
};

export default ListPost;
