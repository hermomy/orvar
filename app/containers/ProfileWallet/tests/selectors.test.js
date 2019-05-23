import { fromJS } from 'immutable';
import makeSelectProfileWallet from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectProfileWallet', () => {
    it('Expect makeSelectProfileWallet to return state from reducer', () => {
        const selector = makeSelectProfileWallet();
        const mock = fromJS({ profileWallet: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
