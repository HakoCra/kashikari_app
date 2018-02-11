'use strict';

import BeaconBroadcast from 'react-native-ibeacon-simulator';
import { DeviceEventEmitter } from 'react-native';
import Beacons                from 'react-native-beacons-manager';
import BluetoothState         from 'react-native-bluetooth-state';
import boundActionCreator from '../ui/boundActionCreator';
import * as infrastructure_types from './types';

const uuid = 'AC4F29C3-FFCE-4F9B-8FB5-10D342F18D7A';
const identifier = 'uehara1414';

const setBroadcast = (major, minor) => {
  BeaconBroadcast.stopAdvertisingBeacon();
  BeaconBroadcast.startAdvertisingBeaconWithString(uuid, identifier, major, minor);
};

const initEmitter = () => {
  Beacons.requestWhenInUseAuthorization();
  // Range for beacons inside the region
  Beacons.startRangingBeaconsInRegion({
    identifier,
    uuid
  });
  Beacons.startUpdatingLocation();

  DeviceEventEmitter.addListener(
    'beaconsDidRange',
    (data) => {
      //console.log("@beacon emitter", data);
      boundActionCreator(infrastructure_types.SET_BEACONS, {beacons: data.beacons});
    }
  );

  BluetoothState.initialize();
};

const BeaconEmitter = {
  setBroadcast,
  initEmitter
};

export default BeaconEmitter;
