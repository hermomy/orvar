/*
 *
 * ProfileRewards actions
 *
 */
import {
    GET_REWARDS,
    GET_REWARDS_SUCCESS,
    GET_REWARDS_FAIL,
} from './constants';

export function getRewards(payload) {
    return {
        type: GET_REWARDS,
        payload,
    };
}

export function getRewardsSuccess(res) {
    return {
        type: GET_REWARDS_SUCCESS,
        // payload: res,
        res,
    };
}

export function getRewardsFail(error) {
    return {
        type: GET_REWARDS_FAIL,
        error,
    };
}
