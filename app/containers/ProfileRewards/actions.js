/*
 *
 * ProfileRewards actions
 *
 */
import {
    GET_REWARDS,
    GET_REWARDS_SUCCESS,
    GET_REWARDS_FAIL,
    GET_REWARDS_INFO,
    GET_REWARDS_INFO_SUCCESS,
    GET_REWARDS_INFO_FAIL,
    REDEEM_REWARDS,
    REDEEM_REWARDS_SUCCESS,
    REDEEM_REWARDS_FAIL,
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
        res,
    };
}
export function getRewardsFail(error) {
    return {
        type: GET_REWARDS_FAIL,
        error,
    };
}

export function getRewardsInfo(url) {
    return {
        type: GET_REWARDS_INFO,
        url,
    };
}
export function getRewardsInfoSuccess(data) {
    return {
        type: GET_REWARDS_INFO_SUCCESS,
        data,
    };
}
export function getRewardsInfoFail(error) {
    return {
        type: GET_REWARDS_INFO_FAIL,
        error,
    };
}
export function redeemRewards(url, types) {
    return {
        type: REDEEM_REWARDS,
        url,
        types,
    };
}
export function redeemRewardsSuccess(data) {
    return {
        type: REDEEM_REWARDS_SUCCESS,
        data,
    };
}
export function redeemRewardsFail(error) {
    return {
        type: REDEEM_REWARDS_FAIL,
        error,
    };
}
