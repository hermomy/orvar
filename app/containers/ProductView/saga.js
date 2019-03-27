import { takeLatest, call, put } from 'redux-saga/effects';
import { apiRequest } from 'globalUtils';
import { getProductSuccess, getProductFail } from './actions';
import { GET_PRODUCT } from './constants';

// Individual exports for testing
export default function* defaultSaga() {
    yield takeLatest(GET_PRODUCT, getProduct);
}

export function* getProduct(action) {
    try {
        const response = yield call(apiRequest, action.api, 'get');
        if (response.ok) {
            yield put(getProductSuccess(response.data));
        } else {
            yield put(getProductFail());
        }
    } catch (error) {
        yield put(getProductFail());
    }
}
