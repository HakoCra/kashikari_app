'use strict';

import { DeviceEventEmitter } from 'react-native';
import Beacons                from 'react-native-beacons-manager';
import BluetoothState         from 'react-native-bluetooth-state';
import boundActionCreator from '../ui/boundActionCreator';
import * as infrastructure_types from './types';

const BeaconEmitter = () => {
  Beacons.requestWhenInUseAuthorization();
  // Define a region which can be identifier + uuid,
  // identifier + uuid + major or identifier + uuid + major + minor
  // (minor and major properties are numbers)
  const region = {
    identifier: 'GemTot for iOS',
    uuid: 'AC4F29C3-FFCE-4F9B-8FB5-10D342F18D7A'
  };
  // Range for beacons inside the region
  Beacons.startRangingBeaconsInRegion(region);
  Beacons.startUpdatingLocation();

  //
  // component state aware here - attach events
  //
  // Ranging: Listen for beacon changes
  DeviceEventEmitter.addListener(
    'beaconsDidRange',
    (data) => {
      console.log("@beacon emitter", data);
      boundActionCreator(infrastructure_types.SET_BEACONS, {beacons: data.beacons});
    }
  );

  // listen bluetooth state change event
  BluetoothState.initialize();
};

export default BeaconEmitter;
