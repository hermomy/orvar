/*
 *
 * ProfileWishlist reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_WISHLIST,
    GET_WISHLIST_SUCCESS,
    GET_WISHLIST_FAILED,
} from './constants';

export const initialState = fromJS({
    wishlist: null,
});

function profileWishlistReducer(state = initialState, action) {
    switch (action.type) {
        case GET_WISHLIST:
            return state
                .set('loading', true)
                .set('error', false);
        case GET_WISHLIST_SUCCESS:
            return state
                .set('error', false)
                .set('loading', false)
                .set('wishlist', action.data.items);
        case GET_WISHLIST_FAILED:
            return state
                .set('error', action.data.items)
                .set('loading', false)
                .set('wishlist', null);
        default:
            return state;
    }
}

export default profileWishlistReducer;
