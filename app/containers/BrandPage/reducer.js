/*
 *
 * BrandPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_BRAND_LIST,
    GET_BRAND_LIST_SUCCESS,
    GET_BRAND_LIST_FAIL,
} from './constants';

export const initialState = fromJS({
    loading: false,
    error: false,
    data: {},
});

function brandPageReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BRAND_LIST:
            return state
                .set('loading', true)
                .set('error', false)
                .set('data', {});
        case GET_BRAND_LIST_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('data', action.brandList);
        case GET_BRAND_LIST_FAIL:
            return state;
        default:
            return state;
    }
}

export default brandPageReducer;
