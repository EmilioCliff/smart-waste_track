/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type SensorData = {
  __typename: "SensorData",
  timestamp?: string | null,
  device_id?: string | null,
  unix_timestamp?: string | null,
  longitude?: string | null,
  latitude?: string | null,
  co2_ppm?: string | null,
  methane_ppm?: string | null,
  percentage_full?: string | null,
  is_fill_critical?: boolean | null,
  is_gas_critical?: boolean | null,
};

export type GetSensorDataQueryVariables = {
};

export type GetSensorDataQuery = {
  getSensorData?:  Array< {
    __typename: "SensorData",
    timestamp?: string | null,
    device_id?: string | null,
    unix_timestamp?: string | null,
    longitude?: string | null,
    latitude?: string | null,
    co2_ppm?: string | null,
    methane_ppm?: string | null,
    percentage_full?: string | null,
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
    timestamp?: string | null,
    device_id?: string | null,
    unix_timestamp?: string | null,
    longitude?: string | null,
    latitude?: string | null,
    co2_ppm?: string | null,
    methane_ppm?: string | null,
    percentage_full?: string | null,
    is_fill_critical?: boolean | null,
    is_gas_critical?: boolean | null,
  } | null > | null,
};
