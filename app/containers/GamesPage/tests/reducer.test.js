
// import { fromJS } from 'immutable';
import gamesPageReducer, { initialState } from '../reducer';

describe('gamesPageReducer', () => {
    it('returns the initial state', () => {
        expect(gamesPageReducer(initialState, {})).toEqual(initialState);
    });
});
