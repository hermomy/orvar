import { takeLatest, call, put } from 'redux-saga/effects';
import { apiRequest } from 'globalUtils';
import { doProductSuccess, doProductFail, addToCartSuccess, addToCartFail } from './actions';
import { GET_PRODUCT, GET_PRODUCT_REVIEW, ADD_TO_CART } from './constants';

// Individual exports for testing
export default function* defaultSaga() {
    yield [
        takeLatest(GET_PRODUCT, productWorker),
        takeLatest(GET_PRODUCT_REVIEW, reviewWorker),
        takeLatest(ADD_TO_CART, addToCartWorker),
    ];
}

export function* reviewWorker(action) {
    try {
        const response = yield call(apiRequest, `/mall/review?id=${action.productId}`, 'get');
        if (response.ok) {
            yield put(doProductSuccess({ reviews: response.data }));
        } else {
            yield put(doProductFail(response.data.message[0].text));
        }
    } catch (error) {
        yield put(doProductFail(error.message));
    }
}

export function* productWorker(action) {
    try {
        const response = yield call(apiRequest, `/mall/${action.productId}`, 'get');
        if (response.ok) {
            yield put(doProductSuccess({ product: response.data }));
        } else {
            yield put(doProductFail(response.data.message[0].text));
        }
    } catch (error) {
        yield put(doProductFail(error.message));
    }
}

function* addToCartWorker(action) {
    const response = yield call(apiRequest, '/cart/mall', 'post', action.payload);
    if (response.ok) {
        yield put(addToCartSuccess());
    } else {
        yield put(addToCartFail(response.data.message));
    }
}
