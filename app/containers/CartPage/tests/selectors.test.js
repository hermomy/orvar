import { fromJS } from 'immutable';
import makeSelectCartPage from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectCartPage', () => {
    it('Expect makeSelectCartPage to return state from reducer', () => {
        const selector = makeSelectCartPage();
        const mock = fromJS({ cartPage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
