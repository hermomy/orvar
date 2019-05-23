import { fromJS } from 'immutable';
import makeSelectProfileWishlist from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectProfileWishlist', () => {
    it('Expect makeSelectProfileWishlist to return state from reducer', () => {
        const selector = makeSelectProfileWishlist();
        const mock = fromJS({ profileWishlist: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
