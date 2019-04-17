import { fromJS } from 'immutable';
import { selectProfileWholePageDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectProfileWholePageDomain', () => {
    it('Expect selectProfileWholePageDomain to return state from reducer', () => {
        const selector = selectProfileWholePageDomain();
        const mock = fromJS({ ProfileWholePage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
