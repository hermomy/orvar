import { fromJS } from 'immutable';
import { selectProfileWishlistDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectProfileWishlistDomain', () => {
    it('Expect selectProfileWishlistDomain to return state from reducer', () => {
        const selector = selectProfileWishlistDomain();
        const mock = fromJS({ ProfileWishlist: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
