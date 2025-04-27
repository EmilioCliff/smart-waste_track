/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getSensorData = /* GraphQL */ `query GetSensorData {
  getSensorData {
    timestamp
    device_id
    apartment
    unix_timestamp
    longitude
    latitude
    co2_ppm
    methane_ppm
    percentage_full
    is_fill_critical
    is_gas_critical
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetSensorDataQueryVariables,
  APITypes.GetSensorDataQuery
>;
export const getSensorDataByDeviceId = /* GraphQL */ `query GetSensorDataByDeviceId($device_id: String!) {
  getSensorDataByDeviceId(device_id: $device_id) {
    timestamp
    device_id
    apartment
    unix_timestamp
    longitude
    latitude
    co2_ppm
    methane_ppm
    percentage_full
    is_fill_critical
    is_gas_critical
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetSensorDataByDeviceIdQueryVariables,
  APITypes.GetSensorDataByDeviceIdQuery
>;
export const getSensorDataByTimestamp = /* GraphQL */ `query GetSensorDataByTimestamp($timestamp: String!) {
  getSensorDataByTimestamp(timestamp: $timestamp) {
    timestamp
    device_id
    apartment
    unix_timestamp
    longitude
    latitude
    co2_ppm
    methane_ppm
    percentage_full
    is_fill_critical
    is_gas_critical
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetSensorDataByTimestampQueryVariables,
  APITypes.GetSensorDataByTimestampQuery
>;
