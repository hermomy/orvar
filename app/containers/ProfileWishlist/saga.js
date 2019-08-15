import { takeLatest, put, call } from 'redux-saga/effects';
import { staticErrorResponse, apiRequest } from 'globalUtils';

import {
    GET_WISHLIST,
} from './constants';
import {
    getWishlistSuccess,
    getWishlistFailed,
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

// Individual exports for testing
export default function* profileWishlistSaga() {
    yield [
        takeLatest(GET_WISHLIST, getWishlistWorker),
    ];
}
