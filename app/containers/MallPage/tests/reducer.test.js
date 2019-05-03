
import { fromJS } from 'immutable';
import mallPageReducer from '../reducer';

describe('mallPageReducer', () => {
    it('returns the initial state', () => {
        expect(mallPageReducer(undefined, {})).toEqual(fromJS({}));
    });
});
