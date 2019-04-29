import { fromJS } from 'immutable';
import selectProfileReviewDomain from '../selectors';
import { initialState } from '../reducer';

describe('selectProfileReviewDomain', () => {
    it('Expect selector select profileReview from state', () => {
        const selector = selectProfileReviewDomain();
        const mock = fromJS({ profileReview: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
