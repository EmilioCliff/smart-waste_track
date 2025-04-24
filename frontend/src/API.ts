/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type SensorData = {
  __typename: "SensorData",
  timestamp: string,
  device_id: string,
  unix_timestamp: string,
  longitude: string,
  latitude: string,
  co2_ppm: string,
  methane_ppm: string,
  percentage_full: string,
  is_fill_critical?: boolean | null,
  is_gas_critical?: boolean | null,
};

export type GetSensorDataQueryVariables = {
};

export type GetSensorDataQuery = {
  getSensorData?:  Array< {
    __typename: "SensorData",
    timestamp: string,
    device_id: string,
    unix_timestamp: string,
    longitude: string,
    latitude: string,
    co2_ppm: string,
    methane_ppm: string,
    percentage_full: string,
    is_fill_critical?: boolean | null,
    is_gas_critical?: boolean | null,
  } | null > | null,
};

export type GetSensorDataByDeviceIdQueryVariables = {
  device_id: string,
};

export type GetSensorDataByDeviceIdQuery = {
  getSensorDataByDeviceId?:  Array< {
    __typename: "SensorData",
    timestamp: string,
    device_id: string,
    unix_timestamp: string,
    longitude: string,
    latitude: string,
    co2_ppm: string,
    methane_ppm: string,
    percentage_full: string,
    is_fill_critical?: boolean | null,
    is_gas_critical?: boolean | null,
  } | null > | null,
};
