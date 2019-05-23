import { fromJS } from 'immutable';
import makeSelectProfileReview from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectProfileReview', () => {
    it('Expect makeSelectProfileReview to return state from reducer', () => {
        const selector = makeSelectProfileReview();
        const mock = fromJS({ profileReview: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
