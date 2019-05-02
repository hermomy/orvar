
import { fromJS } from 'immutable';
import materialUiTestingReducer from '../reducer';

describe('materialUiTestingReducer', () => {
    it('returns the initial state', () => {
        expect(materialUiTestingReducer(undefined, {})).toEqual(fromJS({}));
    });
});
