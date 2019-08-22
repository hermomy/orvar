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
    GET_PRODUCT_DATA,
    GET_PRODUCT_DATA_SUCCESS,
    GET_PRODUCT_DATA_FAILED,
    DELETE_WISHLIST_ITEM,
    DELETE_WISHLIST_ITEM_SUCCESS,
    DELETE_WISHLIST_ITEM_FAILED,
    ADD_TO_CART,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAILED,
} from './constants';

export const initialState = fromJS({
    wishlist: null,
    productData: null,
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
        case GET_PRODUCT_DATA:
            return state
                .set('productData', null)
                .set('dataLoading', true)
                .set('error', false);
        case GET_PRODUCT_DATA_SUCCESS:
            return state
                .set('error', false)
                .set('productData', action.data);
        case GET_PRODUCT_DATA_FAILED:
            return state
                .set('error', action.data)
                .set('productData', null);
        case DELETE_WISHLIST_ITEM:
            return state
                .set('deletingWishlist', true);
        case DELETE_WISHLIST_ITEM_SUCCESS:
            return state
                .set('notification', {
                    type: 'success',
                    category: 'deleteItem',
                    message: action.message,
                });
        case DELETE_WISHLIST_ITEM_FAILED:
            return state
                .set('notification', {
                    type: 'fail',
                    message: action.message,
                });
        case ADD_TO_CART:
            return state
                .set('addingToCart', true);
        case ADD_TO_CART_SUCCESS:
            return state
                .set('notification', {
                    type: 'success',
                    message: action.message,
                });
        case ADD_TO_CART_FAILED:
            return state
                .set('notification', {
                    type: 'fail',
                    message: action.message,
                });
        default:
            return state;
    }
}

export default profileWishlistReducer;
