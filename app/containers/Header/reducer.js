/*
 *
 * Header reducer
 *
 */

import { fromJS } from 'immutable';
// import { dataChecking } from 'globalUtils';
import {
    LAYOUT_TOP_NAV,
    LAYOUT_TOP_NAV_SUCCESS,
    LAYOUT_TOP_NAV_FAIL,
    SEARCH_RESULT,
    SEARCH_RESULT_SUCCESS,
    SEARCH_RESULT_FAIL,
    GET_IMG_LINK,
    GET_IMG_LINK_SUCCESS,
    GET_IMG_LINK_FAILED,
    GET_USER_DATA,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_FAILED,
    GET_CART_DATA,
    GET_CART_DATA_SUCCESS,
    GET_CART_DATA_FAILED,
    ITEM_DELETE,
    ITEM_DELETE_SUCCESS,
    ITEM_DELETE_FAIL,
} from './constants';


export const initialState = fromJS({
    header: {
        loading: false,
        error: false,
        data: null,
    },
    suggestionData: {
        loading: false,
        error: false,
        data: null,
    },
    imgLink: {
        loading: false,
        error: false,
        data: null,
    },
    user: {
        loading: false,
        error: false,
        data: null,
    },
    cart: {
        loading: false,
        error: false,
        data: null,
    },
    delete: {
        loading: false,
        error: false,
        data: null,
    },
});

function headerReducer(state = initialState, action) {
    switch (action.type) {
        case LAYOUT_TOP_NAV:
            return state
                .setIn(['header', 'loading'], true)
                .setIn(['header', 'error'], false)
                .setIn(['header', 'data'], null);
        case LAYOUT_TOP_NAV_SUCCESS:
            return state
                .setIn(['header', 'loading'], false)
                .setIn(['header', 'error'], false)
                .setIn(['header', 'data'], action.headerData);
        case LAYOUT_TOP_NAV_FAIL:
            return state
                .setIn(['header', 'loading'], false)
                .setIn(['header', 'error'], true)
                .setIn(['header', 'data'], action.headerData);
        case SEARCH_RESULT:
            return state
                .setIn(['suggestionData', 'loading'], true)
                .setIn(['suggestionData', 'error'], false)
                .setIn(['suggestionData', 'data'], null);
        case SEARCH_RESULT_SUCCESS:
            return state
                .setIn(['suggestionData', 'loading'], false)
                .setIn(['suggestionData', 'error'], false)
                .setIn(['suggestionData', 'data'], action.searchResultData);
        case SEARCH_RESULT_FAIL:
            return state
                .setIn(['suggestionData', 'loading'], false)
                .setIn(['suggestionData', 'error'], true)
                .setIn(['suggestionData', 'data'], action.searchResultData);
        case GET_IMG_LINK:
            return state
                .setIn(['imgLink', 'loading'], true)
                .setIn(['imgLink', 'error'], false)
                .setIn(['imgLink', 'data'], null);
        case GET_IMG_LINK_SUCCESS:
            return state
                .setIn(['imgLink', 'loading'], false)
                .setIn(['imgLink', 'error'], false)
                .setIn(['imgLink', 'data'], action.imgLink);
        case GET_IMG_LINK_FAILED:
            return state
                .setIn(['imgLink', 'loading'], false)
                .setIn(['imgLink', 'error'], true)
                .setIn(['imgLink', 'data'], action.imgLink);
        case GET_USER_DATA:
            return state
                .setIn(['user', 'loading'], true)
                .setIn(['user', 'error'], false)
                .setIn(['user', 'data'], null);
        case GET_USER_DATA_SUCCESS:
            return state
                .setIn(['user', 'loading'], false)
                .setIn(['user', 'error'], false)
                .setIn(['user', 'data'], action.userData);
        case GET_USER_DATA_FAILED:
            return state
                .setIn(['user', 'loading'], false)
                .setIn(['user', 'error'], true)
                .setIn(['user', 'data'], action.userData);
        case GET_CART_DATA:
            return state
                .setIn(['cart', 'loading'], true)
                .setIn(['cart', 'error'], false)
                .setIn(['cart', 'success'], false)
                .setIn(['cart', 'data'], null);
        case GET_CART_DATA_SUCCESS:
            return state
                .setIn(['cart', 'loading'], false)
                .setIn(['cart', 'error'], false)
                .setIn(['cart', 'success'], true)
                .setIn(['cart', 'data'], action.cartData);
        case GET_CART_DATA_FAILED:
            return state
                .setIn(['cart', 'loading'], false)
                .setIn(['cart', 'error'], true)
                .setIn(['cart', 'success'], false)
                .setIn(['cart', 'data'], action.cartData);
        case ITEM_DELETE:
            return state
                .setIn(['delete', 'loading'], true)
                .setIn(['delete', 'error'], false)
                .setIn(['cart', 'success'], false)
                .setIn(['cart', 'data'], null);
        case ITEM_DELETE_SUCCESS:
            return state
                .setIn(['delete', 'loading'], false)
                .setIn(['delete', 'error'], false)
                .setIn(['cart', 'success'], true)
                .setIn(['cart', 'data'], action.itemUpdate.cart);
        case ITEM_DELETE_FAIL:
            return state
                .setIn(['delete', 'loading'], false)
                .setIn(['delete', 'error'], true)
                .setIn(['cart', 'success'], false)
                .setIn(['cart', 'data'], action.itemUpdate.cart);
        default:
            return state;
    }
}

export default headerReducer;
