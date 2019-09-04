import { fromJS } from 'immutable';
import makeSelectProfileWallet from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectProfileWallet', () => {
    it('Expect makeSelectProfileWallet to return state from reducer', () => {
        const selector = makeSelectProfileWallet();
        const mock = fromJS({ ProfileWallet: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
