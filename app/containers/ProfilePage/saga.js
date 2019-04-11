import { takeLatest, call, put } from 'redux-saga/effects';
import { apiRequest } from 'globalUtils';
import { GET_PROFILE } from './constants';
import { getProfileFail, getProfileSuccess } from './actions';

export function* getProfileWorker(action) {
    console.log('default worker for profilePageSaga', action);
    // yield call, yield put and etc, whatever you like
    const res = yield call(apiRequest, '/profile', 'get', null);
    if (res && res.ok) {
        yield put(getProfileSuccess(res.data));
    } else {
        yield put(getProfileFail(res.data));
    }
}

// Individual exports for testing
export default function* profilePageSaga() {
    yield takeLatest(GET_PROFILE, getProfileWorker);
}
