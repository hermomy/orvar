import { fromJS } from 'immutable';
import makeSelectHomePage from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectHomePage', () => {
    it('Expect makeSelectHomePage to return state from reducer', () => {
        const selector = makeSelectHomePage();
        const mock = fromJS({ HomePage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
