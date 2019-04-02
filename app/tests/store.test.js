/**
 * Test store addons
 */

import { browserHistory } from 'react-router-dom';
import configureStore from '../configureStore';

describe('configureStore', () => {
    let store;

    beforeAll(() => {
        store = configureStore({}, browserHistory);
    });

    describe('injectedReducers', () => {
        it('Expect contain an object for reducers', () => {
            expect(typeof store.injectedReducers).toBe('object');
        });
    });

    describe('injectedSagas', () => {
        it('Expect contain an object for sagas', () => {
            expect(typeof store.injectedSagas).toBe('object');
        });
    });

    describe('runSaga', () => {
        it('Expect contain a hook for `sagaMiddleware.run`', () => {
            expect(typeof store.runSaga).toBe('function');
        });
    });
});

describe('configureStore params', () => {
    it('Expect call window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', () => {
        /* eslint-disable no-underscore-dangle */
        const compose = jest.fn();
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = () => compose;
        configureStore(undefined, browserHistory);
        expect(compose).toHaveBeenCalled();
        /* eslint-enable */
    });
});
