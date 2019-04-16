import { apiRequest } from 'globalUtils';
import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_WISHLIST, DELETE_WISHLIST } from './constants';
import { getWishlistSuccess, getWishlistFail, getWishlist } from './actions';

export function* WishlistDataWorker(action) {
    let res = '';
    if (action.targetpage) {
        res = yield call(apiRequest, `/wishlist?page=${action.targetpage}`, 'get', null);
    } else {
        res = yield call(apiRequest, '/wishlist?page=1', 'get', null);
    }
    if (res && res.ok) {
        yield put(getWishlistSuccess(res.data));
    } else {
        yield put(getWishlistFail(res.data));
    }
}

export function* DeleteWishlistWorker(action) {
    const res = yield call(apiRequest, `/wishlist/${action.productId}`, 'delete');
    console.log(res);
    if (res && res.ok) {
        yield put(getWishlist(action));
    } else {
        yield put(getWishlistFail(res.data));
    }
}

// Individual exports for testing
export default function* profileWishlistSaga() {
    yield [
        takeLatest(GET_WISHLIST, WishlistDataWorker),
        takeLatest(DELETE_WISHLIST, DeleteWishlistWorker),
    ];
}
