import { fromJS } from 'immutable';
import makeSelectAuthPage from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectAuthPage', () => {
    it('Expect makeSelectAuthPage to return state from reducer', () => {
        const selector = makeSelectAuthPage();
        const mock = fromJS({ AuthPage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
