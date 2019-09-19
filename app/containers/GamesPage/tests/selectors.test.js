import { fromJS } from 'immutable';
import makeSelectGamesPage from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectGamesPage', () => {
    it('Expect makeSelectGamesPage to return state from reducer', () => {
        const selector = makeSelectGamesPage();
        const mock = fromJS({ GamesPage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
