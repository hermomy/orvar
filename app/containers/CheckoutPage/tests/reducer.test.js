
// import { fromJS } from 'immutable';
import checkoutPageReducer, { initialState } from '../reducer';

describe('checkoutPageReducer', () => {
    it('returns the initial state', () => {
        expect(checkoutPageReducer(initialState, {})).toEqual(initialState);
    });
});
