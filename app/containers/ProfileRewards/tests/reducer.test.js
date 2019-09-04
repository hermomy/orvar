
// import { fromJS } from 'immutable';
import profileRewardsReducer, { initialState } from '../reducer';

describe('profileRewardsReducer', () => {
    it('returns the initial state', () => {
        expect(profileRewardsReducer(initialState, {})).toEqual(initialState);
    });
});
