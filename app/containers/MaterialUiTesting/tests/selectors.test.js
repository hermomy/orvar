import { fromJS } from 'immutable';
import { selectMaterialUiTestingDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectMaterialUiTestingDomain', () => {
    it('Expect selectMaterialUiTestingDomain to return state from reducer', () => {
        const selector = selectMaterialUiTestingDomain();
        const mock = fromJS({ MaterialUiTesting: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
