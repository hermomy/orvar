import { fromJS } from 'immutable';
import { selectFeedbackPageDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectFeedbackPageDomain', () => {
    it('Expect selectFeedbackPageDomain to return state from reducer', () => {
        const selector = selectFeedbackPageDomain();
        const mock = fromJS({ FeedbackPage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
