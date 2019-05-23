
import { fromJS } from 'immutable';
import headerReducer, { initialState } from '../reducer';

describe('headerReducer', () => {
    it('returns the initial state', () => {
        expect(headerReducer(initialState, {})).toEqual(fromJS(initialState));
    });
});
