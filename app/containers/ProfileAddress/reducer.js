/*
 *
 * ProfileAddress reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_ADDRESS,
    GET_ADDRESS_SUCCESS,
    GET_ADDRESS_FAILED,
    GET_SMS_PREFIX,
    GET_SMS_PREFIX_SUCCESS,
    GET_SMS_PREFIX_FAILED,
} from './constants';

export const initialState = fromJS({
    list: null,
    loading: false,
    error: false,
    common: null,
});

function profileAddressReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ADDRESS:
            return state
                .set('loading', true)
                .set('error', false);
        case GET_ADDRESS_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('list', action.address);
        case GET_ADDRESS_FAILED:
            return state;
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
        default:
            return state;
    }
}

export default profileAddressReducer;
