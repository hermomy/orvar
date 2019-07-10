/*
 *
 * ProfileEditInfo actions
 *
 */

import {
    GET_USER_DATA,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_FAILED,
    GET_COMMON_CONFIG,
    GET_COMMON_CONFIG_SUCCESS,
    GET_COMMON_CONFIG_FAILED,

    CHANGE_PROPS,
    CHANGE_PROPS_AND_UPDATE,
    UPDATE_AVATAR,
    UPDATE_AVATAR_SUCCESS,
    UPDATE_AVATAR_FAILED,
    UPDATE_PASSWORD,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAILED,
    UPDATE_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_FAILED,
} from './constants';

export function getUserData() {
    return {
        type: GET_USER_DATA,
    };
}

export function getUserDataSuccess(response) {
    return {
        type: GET_USER_DATA_SUCCESS,
        data: response.data,
    };
}

export function getUserDataFailed(response) {
    return {
        type: GET_USER_DATA_FAILED,
        data: response.data,
    };
}

export function getCommonConfig() {
    return {
        type: GET_COMMON_CONFIG,
    };
}

export function getCommonConfigSuccess(response) {
    return {
        type: GET_COMMON_CONFIG_SUCCESS,
        data: response.data,
    };
}

export function getCommonConfigFailed(response) {
    return {
        type: GET_COMMON_CONFIG_FAILED,
        data: response.data,
    };
}

export function changeProps({ objKey, dataPath, value }) {
    return {
        type: CHANGE_PROPS,
        objKey,
        dataPath,
        value,
    };
}

export function changePropsAndUpdate({ objKey, dataPath, value, currentValue, formName, showUpdatedTo, successCallback }) {
    return {
        type: CHANGE_PROPS_AND_UPDATE,
        objKey,
        dataPath,
        value,
        currentValue,
        formName,
        showUpdatedTo,
        successCallback,
    };
}

export function updateAvatar({ fileString, file, dataPath }) {
    return {
        type: UPDATE_AVATAR,
        fileString,
        file,
        dataPath,
    };
}

export function updateAvatarSuccess(message, userData) {
    return {
        type: UPDATE_AVATAR_SUCCESS,
        message,
        userData,
    };
}

export function updateAvatarFailed(message) {
    return {
        type: UPDATE_AVATAR_FAILED,
        message,
    };
}

export function updatePassword({ currentPassword, password, passwordConfirmation, successCallback }) {
    return {
        type: UPDATE_PASSWORD,
        currentPassword,
        password,
        passwordConfirmation,
        successCallback,
    };
}

export function updatePasswordSuccess(message) {
    return {
        type: UPDATE_PASSWORD_SUCCESS,
        message,
    };
}

export function updatePasswordFailed(message) {
    return {
        type: UPDATE_PASSWORD_FAILED,
        message,
    };
}

export function updateUserDataSuccess(message) {
    return {
        type: UPDATE_USER_DATA_SUCCESS,
        message,
    };
}

export function updateUserDataFailed(message, userData) {
    return {
        type: UPDATE_USER_DATA_FAILED,
        message,
        userData,
    };
}
