import { fromJS } from 'immutable';
import makeSelectProfileEditInfo from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectProfileEditInfo', () => {
    it('Expect makeSelectProfileEditInfo to return state from reducer', () => {
        const selector = makeSelectProfileEditInfo();
        const mock = fromJS({ profileEditInfo: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
