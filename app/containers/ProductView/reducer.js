/*
 *
 * ProductView reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_PRODUCT,
    GET_PRODUCT_FAIL,
    GET_PRODUCT_SUCCESS,
} from './constants';

export const initialState = fromJS({ data: {} });

function productViewReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT:
            return state
                .set('loading', true);
        case GET_PRODUCT_FAIL:
            return state
                .set('loading', false)
                .set('error', action.error);
        case GET_PRODUCT_SUCCESS:
            return state
                .set('loading', false)
                .set('data', Object.assign({ ...state.get('data') }, action.data));
        default:
            return state;
    }
}

export default productViewReducer;
