import { fromJS } from 'immutable';
import makeSelectProfileRewards from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectProfileRewards', () => {
    it('Expect makeSelectProfileRewards to return state from reducer', () => {
        const selector = makeSelectProfileRewards();
        const mock = fromJS({ ProfileRewards: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
