import { fromJS } from 'immutable';
import { selectProfileEditInformDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectProfileEditInformDomain', () => {
    it('Expect selectProfileEditInformDomain to return state from reducer', () => {
        const selector = selectProfileEditInformDomain();
        const mock = fromJS({ ProfileEditInform: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
