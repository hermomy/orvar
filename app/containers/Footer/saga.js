import { takeLatest } from 'redux-saga/effects';
import { DEFAULT_ACTION } from './constants';

export function* defaultWorker(action) {
    console.log('default worker for footerSaga', action);
    // yield call, yield put and etc, whatever you like
    yield true;
}

// Individual exports for testing
export default function* footerSaga() {
    yield takeLatest(DEFAULT_ACTION, defaultWorker);
}
