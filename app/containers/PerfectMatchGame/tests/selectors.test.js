import { fromJS } from 'immutable';
import makeSelectPerfectMatchGame from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectPerfectMatchGame', () => {
    it('Expect makeSelectPerfectMatchGame to return state from reducer', () => {
        const selector = makeSelectPerfectMatchGame();
        const mock = fromJS({ PerfectMatchGame: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
