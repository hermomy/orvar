import { takeLatest, call, put } from 'redux-saga/effects';
import { staticErrorResponse, apiRequest } from 'globalUtils';
import {
    GET_GAME_TOKEN,
} from './constants';
import {
    getGameTokenSuccess,
    getGameTokenFailed,
} from './actions';

export function* getGameTokenQuery() {
    let err;
    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/xmas/game', 'post', null);
        if (response && response.ok !== false) {
            yield put(getGameTokenSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getGameTokenFailed(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getGameTokenFailed(e));
    }
}


// Individual exports for testing
export default function* perfectMatchGameSaga() {
    yield takeLatest(GET_GAME_TOKEN, getGameTokenQuery);
}
