import { fromJS } from 'immutable';

import languageProviderReducer from '../reducer';
// import {
//     DEFAULT_LOCALE,
// } from '../constants';

describe('appReducer', () => {
    let state;

    beforeEach(() => {
        state = fromJS({
            config: {},
        });
    });

    it('Expect return the initial state', (done) => {
        const expectedResult = state;
        expect(languageProviderReducer(undefined, {})).toEqual(fromJS(expectedResult));
        done();
    });

    // it('changes the locale', () => {
    //     expect(languageProviderReducer(undefined, { type: CHANGE_LOCALE, locale: 'de' }).toJS()).toEqual({
    //         locale: 'de',
    //     });
    // });
});
