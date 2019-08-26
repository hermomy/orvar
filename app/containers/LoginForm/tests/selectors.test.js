import { fromJS } from 'immutable';
import makeSelectLoginForm from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectLoginForm', () => {
    it('Expect makeSelectLoginForm to return state from reducer', () => {
        const selector = makeSelectLoginForm();
        const mock = fromJS({ LoginForm: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
