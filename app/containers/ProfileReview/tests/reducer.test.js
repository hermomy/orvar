
// import { fromJS } from 'immutable';
import profileReviewReducer, { initialState } from '../reducer';

describe('profileReviewReducer', () => {
    it('returns the initial state', () => {
        expect(profileReviewReducer(initialState, {})).toEqual(initialState);
    });
});
