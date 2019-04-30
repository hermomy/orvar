/*
 *
 * MallPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_MALL,
    GET_MALL_SUCCESS,
    GET_MALL_FAIL,
    GET_PRODUCT,
    POST_WISHLIST,
} from './constants';

export const initialState = fromJS({});

function mallPageReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MALL:
            return state
            .set('loading', true)
            .set('success', false);
        case GET_MALL_SUCCESS:
            return state
            .set('data', Object.assign({ ...state.get('data') }, action.payload))
            .set('loading', false)
            .set('success', true);
        case GET_MALL_FAIL:
            return state
            .set('error', action.payload)
            .set('loading', false)
            .set('success', false);
        case GET_PRODUCT:
            return state
            .set('loading', true)
            .set('success', false);
        case POST_WISHLIST:
            return state
                .set('loading', true)
                .set('success', false);
        default:
            return state;
    }
}

export default mallPageReducer;
