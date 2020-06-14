import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import IconArrow from '../../../assets/svg/arrow-down-sign-to-navigate.svg';
import AWSpinner from '../../components/AWSpinner';
import { colors } from '../../styles/base';
import API from '../../utils/Api';

const ItemFacilities = ({ id, name, zoneIds }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [zoneRequest, setZonesRequest] = useState(undefined);
  // const [facilitiesWithZones, setFacilitiesWithZones] = useState(null);
  const navigation = useNavigation();

  const toggleItem = async () => {
    if (!open) {
      try {
        setLoading(true);
        const zone = zoneIds.map(async (zone) => {
          return await API.zones.getZonesById(zone);
        });

        Promise.all(zone).then((data) => {
          setZonesRequest(data);
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    setOpen(!open);
  };

  const goToZones = () => {
    navigation.navigate('More', {
      screen: 'Zones',
      params: { back: true },
    });
    // navigation.navigate('Zones', { back: true });
  };

  const goToUsers = () => {
    navigation.navigate('Users', { back: true });
  };

  const getBackgroundColor = () => {
    return colors.white;
  };

  const renderZones = () => {
    return (
      <View>
        {zoneRequest &&
          zoneRequest.map((item, index) => {
            return (
              <View key={index}>
                <View style={[styles.itemContainerTime]}>
                  <Text style={[styles.itemZone]}>{item.name}</Text>
                </View>
              </View>
            );
          })}
      </View>
    );
  };

  return (
    <Animated.View style={[{ backgroundColor: getBackgroundColor(), ...styles.content }]}>
      <AWSpinner loading={loading}></AWSpinner>
      <View style={[styles.itemContainer]}>
        <TouchableOpacity
          style={{ marginLeft: 10, marginRight: 10, width: '55%' }}
          onPress={() => toggleItem()}
        >
          <View style={[styles.itemName]}>
            {open && <IconArrow style={styles.effectArrow} color={colors.blueItalic} />}
            {!open && <IconArrow fill={colors.grayDarkLight} />}
            <Text style={styles.itemText} numberOfLines={2}>
              {name}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.headerItems}>
          <TouchableOpacity onPress={() => goToZones(id)}>
            <View style={styles.boxSensors}>
              <Text style={styles.sensors} numberOfLines={1}>
                {zoneIds && zoneIds.length}
                {zoneIds == undefined && 0}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => goToUsers(id)}>
            <View style={styles.withOutBoxSensors}>
              {/* // <Text style={styles.sensors} numberOfLines={1}>
                //   {totalIdentities}
                // </Text> */}
              {/* <ion-icon name="people-outline"></ion-icon> */}
              <Icon name="people-outline" color={colors.blueItalic}></Icon>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {open && renderZones()}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  effectArrow: {
    transform: [{ rotate: '180deg' }],
  },
  textZone: {
    fontSize: 16,
    color: colors.blueItalic,
    textAlign: 'left',
  },
  content: {
    borderRadius: 5,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  container: {
    paddingBottom: 14,
  },
  itemContainerTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 14,
  },
  contentFacility: {
    textAlign: 'left',
    fontSize: 14,
    marginBottom: 7,
    color: colors.blueLight,
  },
  withOutBoxSensors: {
    borderRadius: 14,
    marginRight: 13,
    fontSize: 14,
    height: 29,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxSensors: {
    borderRadius: 14,
    marginRight: 13,
    fontSize: 14,
    height: 29,
    width: 45,
    borderWidth: 1,
    borderColor: colors.blueItalic,
    color: colors.blueItalic,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    marginLeft: 16,
    textAlign: 'left',
    fontSize: 14,
    color: colors.grayDarkLight,
  },
  itemZone: {
    marginLeft: 39,
    textAlign: 'left',
    fontSize: 13,
    color: colors.blueItalic,
  },
  sensors: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.blueItalic,
  },
  zoneDate: {
    flex: 1.1,
  },
  zoneTime: {
    textAlign: 'right',
    marginRight: 15,
  },
  separator: {
    height: 1,
    backgroundColor: colors.grayLighter,
    marginBottom: 15,
    marginRight: 15,
  },
  headerItems: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

ItemFacilities.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  totalIdentities: PropTypes.number,
  zoneIds: PropTypes.array,
};

export default ItemFacilities;
