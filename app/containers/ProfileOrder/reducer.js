/*
 *
 * ProfileOrder reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_ORDER,
    GET_ORDER_DETAIL,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAIL,
} from './constants';

export const initialState = fromJS({});

function profileOrderReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ORDER:
            return state
                .set('loading', true)
                .set('error', false);
        case GET_ORDER_DETAIL:
            return state
                .set('loading', true)
                .set('success', true)
                .set('error', false);
        case GET_ORDER_SUCCESS:
            return state
                .set('data', Object.assign({ ...state.get('data') }, action.payload))
                .set('loading', false)
                .set('error', false);
        case GET_ORDER_FAIL:
            return state
                .set('data', action.payload)
                .set('loading', false)
                .set('error', action.payload);
        default:
            return state;
    }
}

export default profileOrderReducer;
