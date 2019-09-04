/*
 *
 * ProfileAddress actions
 *
 */

import {
    GET_CONFIGDATA,
    GET_CONFIGDATA_SUCCESS,
    GET_CONFIGDATA_FAILED,
    GET_ADDRESS,
    GET_ADDRESS_SUCCESS,
    GET_ADDRESS_FAILED,
    GET_ADDRESS_INFO,
    GET_ADDRESS_INFO_SUCCESS,
    GET_ADDRESS_INFO_FAILED,
    ADD_ADDRESS,
    ADD_ADDRESS_SUCCESS,
    ADD_ADDRESS_FAILED,
    UPDATE_ADDRESS,
    UPDATE_ADDRESS_SUCCESS,
    UPDATE_ADDRESS_FAILED,
    DELETE_ADDRESS,
    DELETE_ADDRESS_SUCCESS,
    DELETE_ADDRESS_FAILED,
} from './constants';

export function getConfigData() {
    return {
        type: GET_CONFIGDATA,
    };
}
export function getConfigDataSuccess(data) {
    return {
        type: GET_CONFIGDATA_SUCCESS,
        data,
    };
}
export function getConfigDataFailed(data) {
    return {
        type: GET_CONFIGDATA_FAILED,
        data,
    };
}
export function getAddress() {
    return {
        type: GET_ADDRESS,
    };
}
export function getAddressSuccess(data) {
    return {
        type: GET_ADDRESS_SUCCESS,
        data,
    };
}
export function getAddressFailed(data) {
    return {
        type: GET_ADDRESS_FAILED,
        data,
    };
}
export function getAddressInfo(id) {
    return {
        type: GET_ADDRESS_INFO,
        id,
    };
}
export function getAddressInfoSuccess(data) {
    return {
        type: GET_ADDRESS_INFO_SUCCESS,
        data,
    };
}
export function getAddressInfoFailed(data) {
    return {
        type: GET_ADDRESS_INFO_FAILED,
        data,
    };
}
export function addAddress(addressData) {
    return {
        type: ADD_ADDRESS,
        addressData,
    };
}

export function addAddressSuccess(message) {
    return {
        type: ADD_ADDRESS_SUCCESS,
        message,
    };
}
export function addAddressFailed(message) {
    return {
        type: ADD_ADDRESS_FAILED,
        message,
    };
}
export function updateAddress(addressData, id) {
    return {
        type: UPDATE_ADDRESS,
        addressData,
        id,
    };
}

export function updateAddressSuccess(message) {
    return {
        type: UPDATE_ADDRESS_SUCCESS,
        message,
    };
}
export function updateAddressFailed(message) {
    return {
        type: UPDATE_ADDRESS_FAILED,
        message,
    };
}
export function deleteAddress(id) {
    return {
        type: DELETE_ADDRESS,
        id,
    };
}
export function deleteAddressSuccess(message) {
    return {
        type: DELETE_ADDRESS_SUCCESS,
        message,
    };
}
export function deleteAddressFailed(message) {
    return {
        type: DELETE_ADDRESS_FAILED,
        message,
    };
}
