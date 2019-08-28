/*
 *
 * SignUpPage actions
 *
 */

import {
    AUTH_SIGNUP,
    AUTH_SIGNUP_SUCCESS,
    AUTH_SIGNUP_FAILED,
    AUTH_SENDOTP,
    AUTH_SENDOTP_SUCCESS,
    AUTH_SENDOTP_FAILED,
    GET_SMS_PREFIX,
    GET_SMS_PREFIX_SUCCESS,
    GET_SMS_PREFIX_FAILED,
    GET_IMAGE_LINK,
    GET_IMAGE_LINK_SUCCESS,
    GET_IMAGE_LINK_FAILED,
} from './constants';

export function doSignup(signupData) {
    return {
        type: AUTH_SIGNUP,
        signupData,
    };
}

export function signupSuccess(response) {
    return {
        type: AUTH_SIGNUP_SUCCESS,
        response,
    };
}
export function signupFailed(response) {
    return {
        type: AUTH_SIGNUP_FAILED,
        payload: response,
    };
}
export function doSendOTP(smsPrefix, smsNumber) {
    return {
        type: AUTH_SENDOTP,
        smsPrefix,
        smsNumber,
    };
}

export function sendOTPSuccess(response) {
    return {
        type: AUTH_SENDOTP_SUCCESS,
        payload: response,
        response,
    };
}
export function sendOTPFailed(response) {
    return {
        type: AUTH_SENDOTP_FAILED,
        payload: response,
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
export function getImageLink() {
    return {
        type: GET_IMAGE_LINK,
    };
}
export function getImageLinkSuccess(imageLink) {
    return {
        type: GET_IMAGE_LINK_SUCCESS,
        imageLink,
    };
}
export function getImageLinkFailed() {
    return {
        type: GET_IMAGE_LINK_FAILED,
    };
}
