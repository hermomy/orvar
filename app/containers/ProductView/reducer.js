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
    ADD_TO_CART,
    ADD_TO_CART_FAIL,
    ADD_TO_CART_SUCCESS,
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
        case ADD_TO_CART:
            return state
                .set('adding', true);
        case ADD_TO_CART_SUCCESS:
            return state
                .set('adding', false);
        case ADD_TO_CART_FAIL:
            return state
                .set('adding', false)
                .set('cart_error', action.error);
        default:
            return state;
    }
}

export default productViewReducer;
