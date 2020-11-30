import React, { useContext, useEffect, useReducer, useRef } from 'react';
import { Animated, LayoutAnimation, SafeAreaView, StyleSheet, UIManager, View } from 'react-native';
import { Text } from 'react-native-elements';
import { CSpinner } from '../../components';
import { EmptyList } from '../../components/EmptyList';
import { InputSearch } from '../../components/InputSearch';
import { colors } from '../../styles/base';
import { ContextApp } from '../../utils/ContextApp';
import { ItemTag } from './ItemTag';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const HEADER_MAX_HEIGHT = 180;
const HEADER_MIN_HEIGHT = 84;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const ListTags = ({ type }) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });
  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0.9],
    extrapolate: 'clamp',
  });

  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, -8],
    extrapolate: 'clamp',
  });

  const initalSt = { ...initialState };
  const [state, dispatch] = useReducer(reducer, initalSt);
  const { loading, dataTagsList, requestDatatags } = state;
  const { tags, setPost } = useContext(ContextApp);

  const triggerDispatch = (type, payload) => {
    dispatch({ type, payload });
  };

  const keyExtractor = (_, index) => 'log' + index;

  const onChangeSearch = (value) => {
    const tags = dataTagsList;

    tags.unshift(value);
    triggerDispatch(SET_DATA_TAGS_LIST, tags);
  };

  const handleSetPostRead = (id) => {};

  const deletePost = (id) => {
    setAnimation();
    triggerDispatch(
      SET_DATA_TAGS_LIST,
      dataTagsList.slice().filter((item) => item.id !== id),
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

  useEffect(() => {
    triggerDispatch(SET_DATA_TAGS_LIST, tags);

    setTimeout(() => {
      triggerDispatch(SET_LOADING, false);
    }, 1000);
  }, [tags]);

  return (
    <SafeAreaView style={styles.content}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT - 32 }}
        scrollEventThrottle={16} //
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
      >
        <CSpinner loading={loading} />
        <View style={styles.listContainer}>
          {!loading &&
            dataTagsList.map((item, index) => {
              return (
                <ItemTag {...item} key={index} setPostRead={handleSetPostRead} handlerDelete={deletePost} />
              );
            })}

          {dataTagsList && dataTagsList.length == 0 && <EmptyList info={listFacilitiesStrings.withoutData} />}

          {/* // {!loading && (
          //   <FlatList
          //     style={styles.headerList}
          //     data={dataTagsList}
          //     removeClippedSubviews={true}
          //     ListEmptyComponent={<EmptyList info={listFacilitiesStrings.withoutData} />}
          //     keyExtractor={keyExtractor}
          //     renderItem={({ item, index }) => (
          //       <ItemTag {...item} key={index} setPostRead={handleSetPostRead} handlerDelete={deletePost} />
          //     )}
          //   />
            
          // )} */}
        </View>
      </Animated.ScrollView>
      <Animated.View style={[styles.header, { transform: [{ translateY: headerTranslateY }] }]}>
        <Animated.View
          style={[
            styles.headerBackground,
            {
              backgroundColor: colors.green,
              opacity: imageOpacity,
              transform: [{ translateY: imageTranslateY }],
              marginTop: 40,
            },
          ]}
        >
          <InputSearch onChange={onChangeSearch}></InputSearch>
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={[
          styles.topBar,
          {
            transform: [{ scale: titleScale }, { translateY: titleTranslateY }],
          },
        ]}
      >
        <Text style={styles.title}>TAGS</Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const initialState = {
  loading: true,
  dataTagsList: [],
};

const ACTIONS = {
  SET_LOADING: 'setLoading',
  SET_DATA_TAGS_LIST: 'setPostList',
};

const { SET_LOADING, SET_DATA_TAGS_LIST, SET_REQUEST } = ACTIONS;

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADING:
      return { ...state, loading: payload };
    case SET_DATA_TAGS_LIST:
      return { ...state, dataTagsList: payload };
  }
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: colors.white,
  },

  listContainer: {
    flex: 1,
    marginBottom: 30,
    marginTop: 30,
  },

  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.green,
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  topBar: {
    marginTop: 40,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const listFacilitiesStrings = {
  withoutData: 'No available Post',
};

export default ListTags;
