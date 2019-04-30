import { apiRequest } from 'globalUtils';
import { takeLatest, call, put } from 'redux-saga/effects';
import { MAIN_GET_PROFILE } from './constants';
import { mainGetProfileSuccess, mainGetProfileFail } from './actions';

export function* mainProfileDataWorker() {
    const res = yield call(apiRequest, '/profile', 'get');

    if (res && res.ok) {
        yield put(mainGetProfileSuccess({ mainProfileData: res.data }));
    } else {
        yield put(mainGetProfileFail(res.data));
    }
}

// Individual exports for testing
export default function* profileWholePageSaga() {
    yield takeLatest(MAIN_GET_PROFILE, mainProfileDataWorker);
}
