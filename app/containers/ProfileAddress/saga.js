import {
    takeLatest,
    call,
    put,
} from 'redux-saga/effects';
import {
    GET_ADDRESS,
    GET_SMS_PREFIX,
 } from './constants';

import { apiRequest } from '../../globalUtils';
import {
    getAddressSuccess,
    getAddressFailed,
    getSmsPrefixSuccess,
    getSmsPrefixFailed,
 } from './actions';

export function* getAddressQuery() {
    const response = yield call(apiRequest, '/address', 'get');
    if (response && response.ok) {
        yield put(getAddressSuccess(response.data));
    } else {
        yield put(getAddressFailed(response.data));
    }
}
export function* smsPrefixQuery() {
    const response = yield call(apiRequest, '/app/common', 'get');
    if (response && response.ok) {
        yield put(getSmsPrefixSuccess(response.data));
    } else {
        yield put(getSmsPrefixFailed(response.data));
    }
}
// Individual exports for testing
export default function* profileAddressSaga() {
    yield takeLatest(GET_ADDRESS, getAddressQuery);
    yield takeLatest(GET_SMS_PREFIX, smsPrefixQuery);
}

