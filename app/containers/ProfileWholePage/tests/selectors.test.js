import { fromJS } from 'immutable';
import makeSelectProfileWholePage from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectProfileWholePage', () => {
    it('Expect makeSelectProfileWholePage to return state from reducer', () => {
        const selector = makeSelectProfileWholePage();
        const mock = fromJS({ profileWholePage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
