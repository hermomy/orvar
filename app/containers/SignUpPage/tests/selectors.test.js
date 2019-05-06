import { fromJS } from 'immutable';
import { selectSignUpPageDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectSignUpPageDomain', () => {
    it('Expect selectSignUpPageDomain to return state from reducer', () => {
        const selector = selectSignUpPageDomain();
        const mock = fromJS({ SignUpPage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
