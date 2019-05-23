import { fromJS } from 'immutable';
import makeSelectProfilePage from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectProfilePage', () => {
    it('Expect makeSelectProfilePage to return state from reducer', () => {
        const selector = makeSelectProfilePage();
        const mock = fromJS({ profilePage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
