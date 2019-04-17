import { takeLatest, call, put } from 'redux-saga/effects';
import { apiRequest } from 'globalUtils';
import { GET_USER_INFORM, GET_INFORM_CHOICE } from './constants';
import { getDataSuccess, getDataFail } from './actions';

export function* getUserInformWorker() {
    const res = yield call(apiRequest, '/profile', 'get');

    if (res && res.ok) {
        yield put(getDataSuccess({ UserInformData: res.data }));
    } else {
        yield put(getDataFail(res.data));
    }
}

export function* getUserChoiceWorker() {
    const res = yield call(apiRequest, '/common', 'get');

    if (res && res.ok) {
        yield put(getDataSuccess({ InformChoiceData: res.data }));
    } else {
        yield put(getDataFail(res.data));
    }
}

// Individual exports for testing
export default function* profileEditInformSaga() {
    yield [
        takeLatest(GET_USER_INFORM, getUserInformWorker),
        takeLatest(GET_INFORM_CHOICE, getUserChoiceWorker),
    ];
}
