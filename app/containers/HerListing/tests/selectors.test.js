import { fromJS } from 'immutable';
import { selectHerListingDomain } from '../selectors';
import { initialState } from '../reducer';

describe('select{{ properCase name }}Domain', () => {
    it('Expect select{{ properCase name }}Domain to return state from reducer', () => {
        const selector = selectHerListingDomain();
        const mock = fromJS({ herListing: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
