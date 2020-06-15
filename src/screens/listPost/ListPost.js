import React, { useContext, useEffect, useReducer } from 'react';
import { FlatList, LayoutAnimation, StyleSheet, UIManager, View } from 'react-native';
import { Text } from 'react-native-elements';
import { RectButton } from 'react-native-gesture-handler';
import { CSpinner } from '../../components';
import { EmptyList } from '../../components/EmptyList';
import { InputSearch } from '../../components/InputSearch';
import { colors } from '../../styles/base';
import { ContextApp } from '../../utils/ContextApp';
import { ItemPostList } from './ItemPostList';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const ListPost = ({ type }) => {
  const initalSt = { ...initialState };
  const [state, dispatch] = useReducer(reducer, initalSt);
  const { loading, dataPostsList, requestDataPosts } = state;
  const { posts, setPost } = useContext(ContextApp);

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
    if (type === 'all') {
      if (posts) {
        triggerDispatch(SET_REQUEST, posts);
      }
    } else {
      if (posts) {
        const newListPost = posts.filter((post) => post.isFavorite === true);

        triggerDispatch(SET_REQUEST, newListPost);
      }
    }

    triggerDispatch(SET_LOADING, false);
  };

  const handleSetPostRead = (id) => {
    const postsUpdated = dataPostsList.map((item) => {
      if (item.id === id) {
        item.wasReading = true;
        setPost(item);
      }
      return item;
    });
    triggerDispatch(SET_REQUEST, postsUpdated);
  };

  const deletePost = (id) => {
    setAnimation();
    triggerDispatch(
      SET_REQUEST,
      dataPostsList.slice().filter((item) => item.id !== id),
    );
  };

  const setAnimation = () => {
    LayoutAnimation.configureNext({
      duration: 250,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        springDamping: 0.7,
      },
    });
  };

  const setAnimationDelete = () => {
    LayoutAnimation.configureNext({
      duration: 250,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        springDamping: 0.7,
      },
    });
    LayoutAnimation.configureNext({
      duration: 500,
      create: {
        type: LayoutAnimation.Types.easeIn,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.7,
      },
    });
  };

  const clearPost = () => {
    setAnimationDelete();
    triggerDispatch(SET_REQUEST, []);
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
            keyExtractor={keyExtractor}
            renderItem={({ item, index }) => (
              <ItemPostList
                {...item}
                key={index}
                setPostRead={handleSetPostRead}
                handlerDelete={deletePost}
              />
            )}
          />
        )}
      </View>
      <View style={{ height: 50 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <RectButton
            style={{ backgroundColor: colors.red, flex: 1, justifyContent: 'center', height: 50 }}
            onPress={clearPost}
          >
            <Text style={{ textAlign: 'center', color: colors.white }}>Delete All</Text>
          </RectButton>
        </View>
        {/* */}
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
    marginBottom: 30,
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
