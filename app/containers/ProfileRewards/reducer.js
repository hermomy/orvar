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
} from './constants';

export const initialState = fromJS({
    loading: false,
    error: false,
    data: null,
});

function profileRewardsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_REWARDS:
            return state
                .set('loading', true)
                .set('error', false);
        case GET_REWARDS_SUCCESS:
            return state
                // .set('data', Object.assign({ ...state.get('data') }, action.payload))
                .set('loading', false)
                .set('error', false)
                .set('data', action.res);
        case GET_REWARDS_FAIL:
            return state
                .set('loading', false)
                .set('error', false);
        default:
            return state;
    }
}

export default profileRewardsReducer;
