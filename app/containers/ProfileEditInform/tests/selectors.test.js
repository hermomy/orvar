import { fromJS } from 'immutable';
import makeSelectProfileEditInform from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectProfileEditInform', () => {
    it('Expect makeSelectProfileEditInform to return state from reducer', () => {
        const selector = makeSelectProfileEditInform();
        const mock = fromJS({ profileEditInform: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
