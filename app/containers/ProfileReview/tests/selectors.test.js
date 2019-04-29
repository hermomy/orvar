import { fromJS } from 'immutable';
import { selectProfileReviewDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectProfileReviewDomain', () => {
    it('Expect selectProfileReviewDomain to return state from reducer', () => {
        const selector = selectProfileReviewDomain();
        const mock = fromJS({ ProfileReview: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
