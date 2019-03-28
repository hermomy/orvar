import { takeLatest, call, put } from 'redux-saga/effects';
import { apiRequest } from 'globalUtils';
import { doProductSuccess, doProductFail } from './actions';
import { GET_PRODUCT } from './constants';

// Individual exports for testing
export default function* defaultSaga() {
    yield takeLatest(GET_PRODUCT, productWorker);
}

export function* productWorker(action) {
    try {
        const response = yield call(apiRequest, action.api, 'get');
        if (response.ok) {
            yield put(doProductSuccess(response.data));
        } else {
            yield put(doProductFail());
        }
    } catch (error) {
        yield put(doProductFail());
    }
}
