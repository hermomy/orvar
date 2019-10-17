/*
 *
 * SignUpPage reducer
 *
 */

import { fromJS } from 'immutable';
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

export const initialState = fromJS({
    loading: false,
    error: false,
    success: false,
    signupSuccess: false,
    sendOtpSuccess: false,
    common: null,
    data: {},
    response: null,
    image: null,
});

function signUpPageReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_SIGNUP:
            return state
                .set('signupSuccess', false)
                .set('loading', true)
                .set('error', false);
        case AUTH_SIGNUP_SUCCESS:
            return state
                .set('signupSuccess', true)
                .set('loading', false)
                .set('error', false);
        case AUTH_SIGNUP_FAILED:
            return state
                .set('loading', false)
                .setIn(['error'], action.payload || {
                    messages: [{
                        text: 'ERROR: Please contact system admin...',
                        type: 'error',
                    }],
                });
        case AUTH_SENDOTP:
            return state
                .set('data', false)
                .set('loading', true)
                .setIn(['otp', 'message'], null);
        case AUTH_SENDOTP_SUCCESS:
            return state
                .set('sendOtpSuccess', true)
                .set('loading', false)
                .setIn(['otp', 'message'], action.payload || {
                    message: [{
                        text: 'OTP has been sent.',
                        type: 'success',
                    }],
                })
                .set('response', action.response);
        case AUTH_SENDOTP_FAILED:
            return state
                .set('loading', false)
                .set('sendOtpSuccess', false)
                .setIn(['otp', 'message'], action.payload || {
                    messages: [{
                        text: 'ERROR: Please contact system admin...',
                        type: 'error',
                    }],
                });
        case GET_SMS_PREFIX:
            return state
                .set('loading', true)
                .set('error', false);
        case GET_SMS_PREFIX_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('common', action.smsPrefix);
        case GET_SMS_PREFIX_FAILED:
            return state;
        case GET_IMAGE_LINK:
            return state
                .set('loading', true)
                .set('error', false);
        case GET_IMAGE_LINK_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('image', action.imageLink);
        case GET_IMAGE_LINK_FAILED:
            return state;
        default:
            return state;
    }
}

export default signUpPageReducer;
