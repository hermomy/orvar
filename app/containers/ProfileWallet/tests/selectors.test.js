import { fromJS } from 'immutable';
import { selectProfileWalletDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectProfileWalletDomain', () => {
    it('Expect selectProfileWalletDomain to return state from reducer', () => {
        const selector = selectProfileWalletDomain();
        const mock = fromJS({ ProfileWallet: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
