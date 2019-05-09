
// import { fromJS } from 'immutable';
import mallPageReducer, { initialState } from '../reducer';

describe('mallPageReducer', () => {
    it('returns the initial state', () => {
        expect(mallPageReducer(initialState, {})).toEqual(initialState);
    });
});
