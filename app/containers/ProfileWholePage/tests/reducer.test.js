
import { fromJS } from 'immutable';
import profileWholePageReducer from '../reducer';

describe('profileWholePageReducer', () => {
    it('returns the initial state', () => {
        expect(profileWholePageReducer(undefined, {})).toEqual(fromJS({}));
    });
});
