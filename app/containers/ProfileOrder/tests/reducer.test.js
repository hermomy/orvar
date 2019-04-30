
import { fromJS } from 'immutable';
import profileOrderReducer from '../reducer';

describe('profileOrderReducer', () => {
    it('returns the initial state', () => {
        expect(profileOrderReducer(undefined, {})).toEqual(fromJS({}));
    });
});
