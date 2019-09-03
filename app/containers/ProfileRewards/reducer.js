/*
 *
 * ProfileRewards reducer
 *
 */

import { fromJS } from 'immutable';
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

export const initialState = fromJS({
    rewards: {
        loading: false,
        error: false,
        data: null,
    },
    rewardsInfo: {
        success: false,
        loading: false,
        error: false,
        data: null,
    },
    redeemRewards: {
        success: false,
        loading: false,
        error: false,
        data: null,
    },
});

function profileRewardsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_REWARDS:
            return state
                .setIn(['rewards', 'loading'], true)
                .setIn(['rewards', 'error'], false);
        case GET_REWARDS_SUCCESS:
            return state
                .setIn(['rewards', 'loading'], false)
                .setIn(['rewards', 'error'], false)
                .setIn(['rewards', 'data'], action.res);
        case GET_REWARDS_FAIL:
            return state
                .setIn(['rewards', 'loading'], false)
                .setIn(['rewards', 'error'], true);
        case GET_REWARDS_INFO:
            return state
                .setIn(['rewardsInfo', 'loading'], true)
                .setIn(['rewardsInfo', 'success'], false)
                .setIn(['rewardsInfo', 'data'], null)
                .setIn(['rewardsInfo', 'error'], false)
                .setIn(['redeemRewards', 'data'], null);
        case GET_REWARDS_INFO_SUCCESS:
            return state
                .setIn(['rewardsInfo', 'loading'], false)
                .setIn(['rewardsInfo', 'success'], true)
                .setIn(['rewardsInfo', 'error'], false)
                .setIn(['rewardsInfo', 'data'], action.data);
        case GET_REWARDS_INFO_FAIL:
            return state
                .setIn(['rewardsInfo', 'loading'], false)
                .setIn(['rewardsInfo', 'error'], true);
        case REDEEM_REWARDS:
            return state
                .setIn(['redeemRewards', 'loading'], true)
                .setIn(['redeemRewards', 'success'], false)
                .setIn(['redeemRewards', 'data'], null)
                .setIn(['redeemRewards', 'error'], false);
        case REDEEM_REWARDS_SUCCESS:
            return state
                .setIn(['redeemRewards', 'loading'], false)
                .setIn(['redeemRewards', 'success'], true)
                .setIn(['redeemRewards', 'error'], false)
                .setIn(['redeemRewards', 'data'], action.data);
        case REDEEM_REWARDS_FAIL:
            return state
                .setIn(['redeemRewards', 'loading'], false)
                .setIn(['redeemRewards', 'error'], true);
        default:
            return state;
    }
}

export default profileRewardsReducer;
