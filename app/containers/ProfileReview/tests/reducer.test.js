
import { fromJS } from 'immutable';
import profileReviewReducer from '../reducer';

describe('profileReviewReducer', () => {
    it('returns the initial state', () => {
        expect(profileReviewReducer(undefined, {})).toEqual(fromJS({}));
    });
});
