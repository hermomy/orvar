import { fromJS } from 'immutable';

import languageProviderReducer from '../reducer';
// import {
//     DEFAULT_LOCALE,
// } from '../constants';

describe('appReducer', () => {
    it('returns the initial state', () => {
        expect(languageProviderReducer(undefined, {})).toEqual(fromJS({}));
    });

    // it('changes the locale', () => {
    //     expect(languageProviderReducer(undefined, { type: CHANGE_LOCALE, locale: 'de' }).toJS()).toEqual({
    //         locale: 'de',
    //     });
    // });
});
