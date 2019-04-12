import { apiRequest } from 'globalUtils';
import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_WISHLIST } from './constants';
import { getWishlistSuccess, getWishlistFail } from './actions';

export function* WishlistDataWorker() {
    const res = yield call(apiRequest, '/wishlist?page=1', 'get', null);
    if (res && res.ok) {
        yield put(getWishlistSuccess(res.data));
    } else {
        yield put(getWishlistFail(res.data));
    }
}

// Individual exports for testing
export default function* profileWishlistSaga() {
    yield takeLatest(GET_WISHLIST, WishlistDataWorker);
}
