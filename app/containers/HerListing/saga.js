// import { take, call, put, select } from 'redux-saga/effects';

import { takeLatest, call, put } from 'redux-saga/effects';
import { apiRequest } from 'globalUtils';

import { GET_DATA,
         GET_PAGE,
} from './constants';
import {
    getDataSuccess,
    getDataFail,
    getPageSuccess,
    getPageFail,
} from './actions';

export function* getPayload() {
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

export function* getPage(action) {
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
        takeLatest(GET_DATA, getPayload),
        takeLatest(GET_PAGE, getPage),
    ];
}
