import { fromJS } from 'immutable';
import makeSelectHerListing from '../selectors';
import { initialState } from '../reducer';

describe('selectHerListingDomain', () => {
    it('Expect selectHerListingDomain to return state from reducer', () => {
        const selector = makeSelectHerListing();
        const mock = fromJS({ herListing: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
