import {
    takeLatest,
    call,
    put,
} from 'redux-saga/effects';
import {
    GET_REWARDS,
    GET_REWARDS_INFO,
    REDEEM_REWARDS,
} from './constants';
import { apiRequest } from '../../globalUtils';
import {
    getRewardsSuccess,
    getRewardsFail,
    getRewardsInfoSuccess,
    getRewardsInfoFail,
    redeemRewardsSuccess,
    redeemRewardsFail,
} from './actions';

export function* getRewardsQuery(action) {
    const response = yield call(apiRequest, '/services/gami/rewards', 'get', action.payload);
    if (response && response.ok) {
        yield put(getRewardsSuccess(response.data));
    } else {
        yield put(getRewardsFail(response.data));
    }
}
export function* getRewardsInfoQuery(action) {
    const url = `/services/gami${action.url}`;
    const response = yield call(apiRequest, url, 'get');
    if (response && response.ok) {
        yield put(getRewardsInfoSuccess(response.data));
    } else {
        yield put(getRewardsInfoFail(response.data));
    }
}
export function* redeemRewardsQuery(action) {
    const url = `/services/gami${action.url}`;
    if (action.types === 'locals') {
        const response = yield call(apiRequest, url, 'post');
        if (response && response.ok) {
            yield put(redeemRewardsSuccess(response.data));
        } else {
            yield put(redeemRewardsFail(response.data));
        }
    } else {
        const response = yield call(apiRequest, url, 'put');
        if (response && response.ok) {
            yield put(redeemRewardsSuccess(response.data));
        } else {
            yield put(redeemRewardsFail(response.data));
        }
    }
}

// Individual exports for testing
export default function* profileRewardsSaga() {
    yield takeLatest(GET_REWARDS, getRewardsQuery);
    yield takeLatest(GET_REWARDS_INFO, getRewardsInfoQuery);
    yield takeLatest(REDEEM_REWARDS, redeemRewardsQuery);
}
