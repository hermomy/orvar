import { fromJS } from 'immutable';
import selectFeedbackPageDomain from '../selectors';
import { initialState } from '../reducer';

describe('selectFeedbackPageDomain', () => {
    it('Expect selector select feedback from state', () => {
        const selector = selectFeedbackPageDomain();
        const mock = fromJS({ feedbackPage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
