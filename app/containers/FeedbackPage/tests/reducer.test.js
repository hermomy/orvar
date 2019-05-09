
// import { fromJS } from 'immutable';
import feedbackPageReducer, { initialState } from '../reducer';

describe('feedbackPageReducer', () => {
    it('returns the initial state', () => {
        expect(feedbackPageReducer(initialState, {})).toEqual(initialState);
    });
});
