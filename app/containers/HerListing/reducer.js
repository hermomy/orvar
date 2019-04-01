/*
 *
 * HerListing reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_DATA,
    GET_DATA_SUCCESS,
    GET_DATA_FAIL,
    GET_PAGE,
    GET_PAGE_SUCCESS,
    GET_PAGE_FAIL,
} from './constants';

export const initialState = fromJS({});

function herListingReducer(state = initialState, action) {
    const newdata = { ...state.get('data') };
    switch (action.type) {
        case GET_DATA:
            return state
                .set('getDataSuccess', false)
                .set('loading', true)
                .set('error', false);
        case GET_DATA_SUCCESS:
            return state
                .set('data', action.payload)
                .set('getDataSuccess', true)
                .set('loading', false)
                .set('error', false);
        case GET_DATA_FAIL:
            return state
                .set('loading', false)
                .setIn(['getDataError'], action.payload ||
                    [{
                        text: 'error',
                        type: 'error',
                    }],
                );
        case GET_PAGE:
            return state
                .set('contentLoading', true);
        case GET_PAGE_SUCCESS:
            if (newdata.product && newdata.product.result) {
                newdata.product.result = action.data;
            }
            return state
                .set('data', newdata)
                .set('contentLoading', false);
        case GET_PAGE_FAIL:
            return state
                .set('contentLoading', false);
        default:
            return state;
    }
}

export default herListingReducer;
