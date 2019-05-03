/*
 *
 * HerListing reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_DATA,
    GET_DATA_SUCCESS,
    GET_PRODUCT_SUCCESS,
    GET_DATA_FAIL,
    POST_WISHLIST,
} from './constants';

export const initialState = fromJS({
});

function herListingReducer(state = initialState, action) {
    const newData = { ...state.get('data') };
    switch (action.type) {
        case GET_DATA:
            return state
                .set('getDataSuccess', false)
                .set('loading', true)
                .set('error', false);
        case GET_DATA_SUCCESS:
            return state
                // .set(`${action.dataname}`, Object.assign({ ...state.get('data') }, action.data))
                .set('data', action.data)
                .set('getDataSuccess', true)
                .set('loading', false)
                .set('error', false);
        case GET_PRODUCT_SUCCESS:
            if (newData && newData.product && newData.product.result) {
                newData.product.result = action.data;
            }

            return state
                .set('data', newData)
                .set('getDataSuccess', true)
                .set('loading', false)
                .set('error', false);
        case GET_DATA_FAIL:
            return state
                .set('loading', false)
                .setIn(['getDataError'], action.data ||
                    [{
                        text: 'error',
                        type: 'error',
                    }],
                );
        case POST_WISHLIST:
            return state
                .set('loading', true)
                .set('success', false);
        default:
            return state;
    }
}

export default herListingReducer;
