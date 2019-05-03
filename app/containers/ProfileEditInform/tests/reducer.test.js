
import { fromJS } from 'immutable';
import profileEditInformReducer from '../reducer';

describe('profileEditInformReducer', () => {
    it('returns the initial state', () => {
        expect(profileEditInformReducer(undefined, {})).toEqual(fromJS({}));
    });
});
