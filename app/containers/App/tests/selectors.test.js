import { fromJS } from 'immutable';
import {
    selectGlobal,
    selectRoute,
    selectSession,
    makeSelectChecked,
    makeSelectUserData,
    makeSelectLocation,
} from '../selectors';

describe('Global Selector', () => {
    it('Expect select the global state', () => {
        const globalState = fromJS({});
        const mock = fromJS({ global: globalState });
        expect(selectGlobal(mock)).toEqual(globalState);
    });
});

describe('Routes Selector', () => {
    it('Expect select the routes state', () => {
        const routeState = fromJS({
            location: {},
        });
        const mock = fromJS({ route: routeState });
        expect(selectRoute(mock)).toEqual(routeState);
    });

    it('Expect select the location', () => {
        const selector = makeSelectLocation();
        const d = fromJS({
            location: {
                pathname: '/test_path',
            },
        });

        const mock = fromJS({
            route: d,
        });
        expect(d.get('location')).toEqual(selector(mock));
    });
});

describe('Session Selector', () => {
    it('Expect select the session state', () => {
        const sessionState = fromJS({
            checked: false,
            user: {},
        });
        const mock = fromJS({
            session: sessionState,
        });
        expect(selectSession(mock)).toEqual(sessionState);
    });

    it('Expect select the checked', () => {
        const selectChecked = makeSelectChecked();
        const checkedState = fromJS({
            checked: false,
        });
        const mock = fromJS({
            session: checkedState,
        });

        expect(checkedState.get('checked')).toEqual(selectChecked(mock));
    });

    it('Expect select user data', () => {
        const selectUser = makeSelectUserData();
        const userState = fromJS({
            user: {},
        });
        const mock = fromJS({
            session: userState,
        });

        expect(userState.get('user')).toEqual(selectUser(mock));
    });
});
