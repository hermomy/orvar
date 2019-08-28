import {
    takeLatest,
    call,
    put,
} from 'redux-saga/effects';
import {
    GET_REWARDS,
} from './constants';
import { apiRequest } from '../../globalUtils';
import {
    getRewardsSuccess,
    getRewardsFail,
} from './actions';

export function* getRewardsQuery(action) {
    console.log('action.payload', action.payload);
    const response = yield call(apiRequest, '/services/gami/rewards', 'get', action.payload);
    if (response && response.ok) {
        yield put(getRewardsSuccess(response.data));
    } else {
        yield put(getRewardsFail(response.data));
    }
}

// Individual exports for testing
export default function* profileRewardsSaga() {
    yield takeLatest(GET_REWARDS, getRewardsQuery);
}
