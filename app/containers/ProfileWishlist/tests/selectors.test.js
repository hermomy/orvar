import { fromJS } from 'immutable';
import selectProfileWishlistDomain from '../selectors';
import { initialState } from '../reducer';

describe('selectProfileWishlistDomain', () => {
    it('Expect selector select profileWishlist from state', () => {
        const selector = selectProfileWishlistDomain();
        const mock = fromJS({ profileWishlist: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
