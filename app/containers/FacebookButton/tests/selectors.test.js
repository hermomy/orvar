import { fromJS } from 'immutable';
import makeSelectFacebookButton from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectFacebookButton', () => {
    it('Expect makeSelectFacebookButton to return state from reducer', () => {
        const selector = makeSelectFacebookButton();
        const mock = fromJS({ FacebookButton: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
