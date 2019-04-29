
import { fromJS } from 'immutable';
import feedbackPageReducer from '../reducer';

describe('feedbackPageReducer', () => {
    it('returns the initial state', () => {
        expect(feedbackPageReducer(undefined, {})).toEqual(fromJS({}));
    });
});
