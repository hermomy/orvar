import { fromJS } from 'immutable';
import selectProfileEditInformDomain from '../selectors';
import { initialState } from '../reducer';

describe('selectProfileEditInformDomain', () => {
    it('Expect selector select profileEditInform from state', () => {
        const selector = selectProfileEditInformDomain();
        const mock = fromJS({ profileEditInform: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
