import { useFocusEffect } from '@react-navigation/native';
import React, { useContext, useEffect, useReducer } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { InputSearch } from '../../components';
import AWSpinner from '../../components/AWSpinner';
import { ContextSuperUser } from '../../components/core/AppContainer/context/ContextSuperUser';
import EmptyList from '../../components/EmptyList';
// import { InputPickerSelector } from '../../components/';
import PageContainer from '../../components/PageContainer';
import { colors } from '../../styles/base';
import API from '../../utils/Api';
import { ContextApp } from '../../utils/ContextApp';
import ItemFacilities from './ItemFacilities';

const HeaderItem = () => (
  <View style={styles.headerContainer}>
    <Text style={[styles.headerText, { marginLeft: 30 }]}>Name</Text>
    <View style={styles.headerItems}>
      <Text style={[styles.headerText, { textAlign: 'center' }]}>Zones</Text>
      <Text style={[styles.headerText, { textAlign: 'center' }]}>Users</Text>
    </View>
  </View>
);

const ListFacilities = ({ route, param, routes }) => {
  const initalSt = { ...initialState };
  const [state, dispatch] = useReducer(reducer, initalSt);
  const { loading, dataFacilitesList, requestDataFacilities } = state;
  const { user } = useContext(ContextApp);
  const { dataRoutes } = useContext(ContextSuperUser);

  const triggerDispatch = (type, payload) => {
    dispatch({ type, payload });
  };

  const keyExtractor = (_, index) => 'log' + index;

  const onChangeSearch = (value) => {
    searchFilter(value);
  };

  const searchFilter = (text) => {
    if (text != '') {
      const newData = requestDataFacilities.filter((item) => {
        const itemData = `${item.name.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      triggerDispatch(SET_DATA_FACILITIES_LIST, newData);
    } else {
      triggerDispatch(SET_DATA_FACILITIES_LIST, requestDataFacilities);
    }
  };

  const fetchDataFacilities = async () => {
    try {
      const { user: dataUser } = user;
      let data = await API.facilities.getFacilitiesByFacilityOwnerId(dataUser.facilityOwnerId);
      triggerDispatch(SET_REQUEST, data);
      triggerDispatch(SET_LOADING, false);
    } catch (error) {
      console.log(error);
      triggerDispatch(SET_LOADING, false);
    }
  };

  useEffect(() => {
    fetchDataFacilities();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (dataRoutes && dataRoutes.facility) {
        triggerDispatch(SET_REQUEST, [...requestDataFacilities, dataRoutes.facility]);
      }
    }, [dataRoutes]),
  );

  return (
    <View style={styles.content}>
      <AWSpinner loading={loading} />
      <InputSearch onChange={onChangeSearch} reloadItems={fetchDataFacilities}></InputSearch>

      <View style={styles.listContainer}>
        {!loading && (
          <FlatList
            style={styles.headerList}
            data={dataFacilitesList}
            removeClippedSubviews={false}
            ListHeaderComponent={dataFacilitesList && dataFacilitesList.length ? <HeaderItem /> : null}
            ListEmptyComponent={<EmptyList info={listFacilitiesStrings.withoutData} />}
            stickyHeaderIndices={[0]}
            keyExtractor={keyExtractor}
            renderItem={({ item, index }) => <ItemFacilities {...item} key={index} />}
          />
        )}
      </View>
    </View>
  );
};

const initialState = {
  loading: true,
  dataFacilitesList: undefined,
  requestDataFacilities: undefined,
};

const ACTIONS = {
  SET_LOADING: 'setLoading',
  SET_DATA_FACILITIES_LIST: 'setNotificationInfo',
  SET_REQUEST: 'setRequestFacilities',
};

const { SET_LOADING, SET_DATA_FACILITIES_LIST, SET_REQUEST } = ACTIONS;

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADING:
      return { ...state, loading: payload };
    case SET_DATA_FACILITIES_LIST:
      return { ...state, dataFacilitesList: payload };
    case SET_REQUEST:
      return { ...state, requestDataFacilities: payload, dataFacilitesList: payload };
  }
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
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
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 20,
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
  title: 'Facilities',
  withoutData: 'No available facilities',
};

export default PageContainer(ListFacilities, {
  title: listFacilitiesStrings.title,
  hasScrollView: false,
  withCircleHeader: false,
  haveMenu: true,
  haveAdd: 'Facility',
  margin: 0,
});
