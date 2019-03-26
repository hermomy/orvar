// import { take, call, put, select } from 'redux-saga/effects';

import { takeLatest, call, put } from 'redux-saga/effects';
import { apiRequest, setCookie } from 'globalUtils';
import globalScope from 'globalScope';

import { GETDATA,
         GETPAGE,
} from './constants';
import {
    getDataSuccess,
    getDataFail,
    getPageSuccess,
    getPageFail,
} from './actions';

export function* getpayload() {
    try {
        const payload = yield call(apiRequest, '/mall', 'get', null, '');
        if (payload && payload.ok) {
            yield put(getDataSuccess(payload.data));
        } else {
            yield put(getDataFail(payload.data));
        }
    } catch (error) {
        yield put(getDataFail(error));
    }
}

export function* getpage(action) {
    try {
        const pagedata = yield call(apiRequest, action.api, 'get', null, '');
        yield put(getPageSuccess(pagedata.data));
    } catch (error) {
        yield put(getPageFail());
    }
}

// Individual exports for testing
export default function* defaultSaga() {
    yield [
        takeLatest(GETDATA, getpayload),
        takeLatest(GETPAGE, getpage),
    ];
}
