import { takeLatest, put, call } from 'redux-saga/effects';
import { staticErrorResponse, apiRequest } from 'globalUtils';

import {
    GET_WISHLIST,
    DELETE_WISHLIST_ITEM,
    ADD_TO_CART,
} from './constants';
import {
    getWishlistSuccess,
    getWishlistFailed,
    deleteWishlistItemSuccess,
    deleteWishlistItemFailed,
    addToCartSuccess,
    addToCartFailed,
} from './actions';

export function* getWishlistWorker() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/wishlist');
        if (response && response.ok !== false) {
            yield put(getWishlistSuccess(response));
        } else if (response && response.ok === false) {
            yield put(getWishlistFailed(response));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getWishlistFailed(e));
    }
}

export function* deleteWishlistItemWorker(action) {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, `/wishlist/${action.orderID}`, 'delete');
        const messages = response.data.messages.map((message) => message.text);

        if (response && response.ok !== false) {
            yield put(deleteWishlistItemSuccess(messages.toString()));
        } else if (response && response.ok === false) {
            yield put(deleteWishlistItemFailed(messages.toString()));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(deleteWishlistItemFailed(e));
    }
}

export function* addToCartWorker(action) {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/cart/mall', 'post', {
            id: action.orderID,
        });
        const messages = response.data.messages.map((message) => message.text);

        if (response && response.data.success !== false) {
            yield put(addToCartSuccess(messages.toString()));
        } else if (response && response.data.success === false) {
            yield put(addToCartFailed(messages.toString()));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(addToCartFailed(e));
    }
}

// Individual exports for testing
export default function* profileWishlistSaga() {
    yield [
        takeLatest(GET_WISHLIST, getWishlistWorker),
        takeLatest(DELETE_WISHLIST_ITEM, deleteWishlistItemWorker),
        takeLatest(ADD_TO_CART, addToCartWorker),
    ];
}
