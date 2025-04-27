/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type SensorData = {
  __typename: "SensorData",
  timestamp: string,
  device_id: string,
  apartment: string,
  unix_timestamp: string,
  longitude: string,
  latitude: string,
  co2_ppm: number,
  methane_ppm: number,
  percentage_full: number,
  is_fill_critical: boolean,
  is_gas_critical: boolean,
};

export type GetSensorDataQueryVariables = {
};

export type GetSensorDataQuery = {
  getSensorData?:  Array< {
    __typename: "SensorData",
    timestamp: string,
    device_id: string,
    apartment: string,
    unix_timestamp: string,
    longitude: string,
    latitude: string,
    co2_ppm: number,
    methane_ppm: number,
    percentage_full: number,
    is_fill_critical: boolean,
    is_gas_critical: boolean,
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
    apartment: string,
    unix_timestamp: string,
    longitude: string,
    latitude: string,
    co2_ppm: number,
    methane_ppm: number,
    percentage_full: number,
    is_fill_critical: boolean,
    is_gas_critical: boolean,
  } | null > | null,
};

export type GetSensorDataByTimestampQueryVariables = {
  timestamp: string,
};

export type GetSensorDataByTimestampQuery = {
  getSensorDataByTimestamp?:  Array< {
    __typename: "SensorData",
    timestamp: string,
    device_id: string,
    apartment: string,
    unix_timestamp: string,
    longitude: string,
    latitude: string,
    co2_ppm: number,
    methane_ppm: number,
    percentage_full: number,
    is_fill_critical: boolean,
    is_gas_critical: boolean,
  } | null > | null,
};
