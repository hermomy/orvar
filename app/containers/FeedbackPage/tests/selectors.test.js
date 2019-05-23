import { fromJS } from 'immutable';
import makeSelectFeedbackPage from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectFeedbackPage', () => {
    it('Expect makeSelectFeedbackPage to return state from reducer', () => {
        const selector = makeSelectFeedbackPage();
        const mock = fromJS({ feedbackPage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
