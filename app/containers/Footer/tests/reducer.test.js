
// import { fromJS } from 'immutable';
import footerReducer, { initialState } from '../reducer';

describe('footerReducer', () => {
    it('returns the initial state', () => {
        expect(footerReducer(initialState, {})).toEqual(initialState);
    });
});
