// import { take, call, put, select } from 'redux-saga/effects';

import { takeLatest, call, put } from 'redux-saga/effects';
import { apiRequest } from 'globalUtils';

import { GET_DATA } from './constants';
import {
    getDataSuccess,
    getDataFail,
} from './actions';

export function* getPayload(actions) {
    try {
        const res = yield call(apiRequest, actions.api, 'get', null, '');
        if (res.ok) {
            yield put(getDataSuccess(res.data, actions.dataname));
        }
        if (res) {
            yield put(getDataFail(res.data));
        }
    } catch (error) {
        yield put(getDataFail(error));
    }
}

// Individual exports for testing
export default function* defaultSaga() {
    yield takeLatest(GET_DATA, getPayload);
}
