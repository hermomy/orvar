import { fromJS } from 'immutable';
import { selectHeaderDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectHeaderDomain', () => {
    it('Expect selectHeaderDomain to return state from reducer', () => {
        const selector = selectHeaderDomain();
        const mock = fromJS({ Header: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
