import { fromJS } from 'immutable';
import { selectMallPageDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectMallPageDomain', () => {
    it('Expect selectMallPageDomain to return state from reducer', () => {
        const selector = selectMallPageDomain();
        const mock = fromJS({ MallPage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
