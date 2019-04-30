import { takeLatest, call, put } from 'redux-saga/effects';
import { apiRequest } from 'globalUtils';
import {
    GET_MALL,
    GET_PRODUCT,
    POST_WISHLIST,
} from './constants';
import {
    getMallSuccess,
    getMallFail,
    getProduct,
} from './actions';

export function* getMallDataWorker(action) {
    const res = yield call(apiRequest, action.api, 'get');

    if (res && res.ok) {
        yield put(getMallSuccess({ originalMallData: res.data }));
    } else {
        yield put(getMallFail(res.data));
    }
}

export function* getProductDataWorker(action) {
    const res = yield call(apiRequest, action.url, 'get');

    if (res && res.ok) {
        yield put(getMallSuccess({ productData: res.data }));
    } else {
        yield put(getMallFail(res.data));
    }
}

export function* postWishlistWorker(actions) {
    const res = yield call(apiRequest, `/wishlist/${actions.id}`, 'post');

    if (res && res.ok) {
        console.log(`${actions.selfurl.split('?')[1]}`);
        yield put(getProduct(`mall/list?${actions.selfurl.split('?')[1]}`));
    } else {
        yield put(getMallFail(res.data));
    }
}

// Individual exports for testing
export default function* mallPageSaga() {
    yield [
        takeLatest(GET_MALL, getMallDataWorker),
        takeLatest(GET_PRODUCT, getProductDataWorker),
        takeLatest(POST_WISHLIST, postWishlistWorker),
    ];
}
