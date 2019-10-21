import { takeLatest, call, put } from 'redux-saga/effects';
import { staticErrorResponse, apiRequest } from 'globalUtils';
import {
    GET_RESULT,
} from './constants';
import {
    getResultSuccess,
    getResultFailed,
} from './actions';

export function* getResultQuery(action) {
    let err;
    try {
        const response = yield call(apiRequest, '/xmas/game', 'put', JSON.stringify(action.payload));
        if (response && response.ok !== false) {
            yield put(getResultSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getResultFailed(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getResultFailed(e));
    }
}
// Individual exports for testing
export default function* gamesPageSaga() {
    yield takeLatest(GET_RESULT, getResultQuery);
}
