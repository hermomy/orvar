import { fromJS } from 'immutable';
import selectMallPageDomain from '../selectors';
import { initialState } from '../reducer';

describe('selectMallPageDomain', () => {
    it('Expect selector select mallPage from state', () => {
        const selector = selectMallPageDomain();
        const mock = fromJS({ mallPage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
