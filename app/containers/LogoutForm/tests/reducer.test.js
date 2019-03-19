
import { fromJS } from 'immutable';
import logoutFormReducer from '../reducer';

describe('logoutFormReducer', () => {
    it('returns the initial state', () => {
        expect(logoutFormReducer(undefined, {})).toEqual(fromJS({}));
    });
});
