/*
 *
 * ProfileWallet reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_VOUCHER,
    GET_DATA_SUCCESS,
    GET_DATA_FAIL,
    GET_BALANCE,
    GET_PROFILE,
} from './constants';

export const initialState = fromJS({});

function profileWalletReducer(state = initialState, action) {
    switch (action.type) {
        case GET_VOUCHER:
            return state
                .set('loading', true)
                .set('success', false);
        case GET_DATA_SUCCESS:
            return state
                .set('data', Object.assign({ ...state.get('data') }, action.payload))
                .set('loading', false)
                .set('success', true);
        case GET_DATA_FAIL:
            return state
                .set('loading', false)
                .set('success', false)
                .set('error', action.payload);
        case GET_BALANCE:
            return state
                .set('loading', true)
                .set('success', false);
        case GET_PROFILE:
            return state
                .set('loading', true)
                .set('success', false);
        default:
            return state;
    }
}

export default profileWalletReducer;
