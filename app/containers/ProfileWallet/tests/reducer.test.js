
import { fromJS } from 'immutable';
import profileWalletReducer from '../reducer';

describe('profileWalletReducer', () => {
    it('returns the initial state', () => {
        expect(profileWalletReducer(undefined, {})).toEqual(fromJS({}));
    });
});
