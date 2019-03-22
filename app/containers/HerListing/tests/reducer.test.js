
import { fromJS } from 'immutable';
import herListingReducer from '../reducer';

describe('herListingReducer', () => {
    it('returns the initial state', () => {
        expect(herListingReducer(undefined, {})).toEqual(fromJS({}));
    });
});
