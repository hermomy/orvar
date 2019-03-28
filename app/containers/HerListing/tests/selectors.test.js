import { fromJS } from 'immutable';
import selectHerListingDomain from '../selectors';
import { initialState } from '../reducer';

describe('selectHerListingDomain', () => {
    it('Expect to have unit tests specified', () => {
        const selector = selectHerListingDomain();
        const mock = fromJS({ herListing: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
