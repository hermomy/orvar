/*
 *
 * ProfileWishlist reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_WISHLIST,
    GET_WISHLIST_SUCCESS,
    GET_WISHLIST_FAIL,
    DELETE_WISHLIST,
} from './constants';

export const initialState = fromJS({});

function profileWishlistReducer(state = initialState, action) {
    switch (action.type) {
        case GET_WISHLIST:
            return state
                .set('loading', true)
                .set('error', false);
        case GET_WISHLIST_SUCCESS:
            return state
                .set('data', action.payload)
                .set('success', true)
                .set('loading', false)
                .set('error', false);
        case GET_WISHLIST_FAIL:
            return state
                .set('data', action.payload)
                .set('loading', false)
                .set('error', action.payload);
        case DELETE_WISHLIST:
            return state
                .set('delete', true)
                .set('loading', false)
                .set('error', action.payload);
        default:
            return state;
    }
}

export default profileWishlistReducer;
