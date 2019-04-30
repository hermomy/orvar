/*
 *
 * ProfileEditInform actions
 *
 */

import {
    GET_INFORM_CHOICE,
    GET_USER_INFORM,
    GET_USER_ADDRESS,
    GET_DATA_SUCCESS,
    GET_DATA_FAIL,
    PUT_DATA,
    POST_ADDRESS,
} from './constants';

// /common
export function getInformChoice() {
    return {
        type: GET_INFORM_CHOICE,
    };
}

export function getUserInform() {
    return {
        type: GET_USER_INFORM,
    };
}

export function getUserAddress(addressId) {
    return {
        type: GET_USER_ADDRESS,
        addressId,
    };
}

export function getDataSuccess(res) {
    return {
        type: GET_DATA_SUCCESS,
        payload: res,
    };
}

export function getDataFail(error) {
    return {
        type: GET_DATA_FAIL,
        error,
    };
}

export function putData(UserInform, gender, year, month, day, skinTone, skinType, skinConcern) {
    return {
        type: PUT_DATA,
        UserInform,
        gender,
        year,
        month,
        day,
        skinTone,
        skinType,
        skinConcern,
    };
}

export function postAddress(HTTPMethod, AddressDetail, receiver_name, line_1, line_2, line_3, city, postal_code, state, sms_prefix, sms_number, contact_number) {
    return {
        type: POST_ADDRESS,
        HTTPMethod,
        AddressDetail,
        receiver_name,
        line_1,
        line_2,
        line_3,
        city,
        postal_code,
        state,
        sms_prefix,
        sms_number,
        contact_number,
    };
}
