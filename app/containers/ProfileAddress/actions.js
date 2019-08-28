/*
 *
 * ProfileAddress actions
 *
 */

import {
    GET_ADDRESS,
    GET_ADDRESS_SUCCESS,
    GET_ADDRESS_FAILED,
    GET_SMS_PREFIX,
    GET_SMS_PREFIX_SUCCESS,
    GET_SMS_PREFIX_FAILED,
} from './constants';

export function getAddress() {
    return {
        type: GET_ADDRESS,
    };
}
export function getAddressSuccess(address) {
    return {
        type: GET_ADDRESS_SUCCESS,
        address,
    };
}
export function getAddressFailed() {
    return {
        type: GET_ADDRESS_FAILED,
    };
}
export function getSmsPrefix() {
    return {
        type: GET_SMS_PREFIX,
    };
}
export function getSmsPrefixSuccess(smsPrefix) {
    return {
        type: GET_SMS_PREFIX_SUCCESS,
        smsPrefix,
    };
}
export function getSmsPrefixFailed() {
    return {
        type: GET_SMS_PREFIX_FAILED,
    };
}
