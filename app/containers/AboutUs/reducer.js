/*
 *
 * AboutUs reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_CAREER,
    GET_PAYMENT_BANK,
    GET_DATA_SUCCESS,
    GET_DATA_FAIL,
} from './constants';

export const initialState = fromJS({});

function aboutUsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CAREER:
            return state
                .set('loading', true)
                .set('success', false);
        case GET_PAYMENT_BANK:
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
                .set('error', action.payload)
                .set('loading', false)
                .set('success', false);
        default:
            return state;
    }
}

export default aboutUsReducer;
