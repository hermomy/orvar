// import { take, call, put, select } from 'redux-saga/effects';

import { takeLatest, call, put } from 'redux-saga/effects';
import { apiRequest } from 'globalUtils';

import { GET_DATA } from './constants';
import {
    getDataSuccess,
    getProductSuccess,
    getDataFail,
} from './actions';

export function* fetchData(actions) {
    try {
        let apiUrl = '/mall';
        let baseUrl = '';
        if (actions.api) {
            apiUrl = '';
            baseUrl = actions.api;
        } else if (actions.dataType === 'mallList') {
            apiUrl = `/mall/list?${actions.queryParamString}`;
        }
        const res = yield call(apiRequest, apiUrl, 'get', null, baseUrl);
        if (res.ok) {
            if (actions.dataType === 'mallList') {
                yield put(getProductSuccess(res.data, actions.dataType));
            } else {
                yield put(getDataSuccess(res.data, actions.dataType));
            }
        } else {
            yield put(getDataFail(res.data));
        }
    } catch (error) {
        yield put(getDataFail(error));
    }
}

// Individual exports for testing
export default function* herListingSaga() {
    yield takeLatest(GET_DATA, fetchData);
}
