import { fromJS } from 'immutable';
import makeSelectMallPage from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectMallPage', () => {
    it('Expect makeSelectMallPage to return state from reducer', () => {
        const selector = makeSelectMallPage();
        const mock = fromJS({ mallPage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
