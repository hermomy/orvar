import { fromJS } from 'immutable';
import selectProfileWalletDomain from '../selectors';
import { initialState } from '../reducer';

describe('selectProfileWalletDomain', () => {
    it('Expect selector select profileWallet from state', () => {
        const selector = selectProfileWalletDomain();
        const mock = fromJS({ profileWallet: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
