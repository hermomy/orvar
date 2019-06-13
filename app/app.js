/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

import initialiseApp from 'initialiseApp';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import '!file-loader?name=[name].[ext]!./images/icon-72x72.png';
import '!file-loader?name=[name].[ext]!./images/icon-96x96.png';
import '!file-loader?name=[name].[ext]!./images/icon-128x128.png';
import '!file-loader?name=[name].[ext]!./images/icon-144x144.png';
import '!file-loader?name=[name].[ext]!./images/icon-152x152.png';
import '!file-loader?name=[name].[ext]!./images/icon-192x192.png';
import '!file-loader?name=[name].[ext]!./images/icon-384x384.png';
import '!file-loader?name=[name].[ext]!./images/icon-512x512.png';
import '!file-loader?name=[name].[ext]!./manifest.json';
import 'file-loader?name=[name].[ext]!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import 'global-styles.scss';
import configureStore from './configureStore';
import { translationMessages } from './i18n';

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#660033',
        },
        secondary: {
            main: '#ff4081',
        },
        disabled: {
            main: '#989898',
        },
    },
    overrides: {
        MuiAvatar: {
            root: {
                display: 'inline-flex',
            },
        },
        MuiBadge: {
            badge: {
                height: '10px',
                minWidth: '10px',
                right: '5px',
                top: '2px',
            },
        },
        // MuiCard: {
        //     root: {
        //         width: '95%',
        //         height: '192px',
        //     },
        // },
        MuiCardHeader: {
            // content: {
            //     flex: 'none',
            // },
            // root: {
            //     padding: '14px',
            // },
        },
        MuiCardContent: {
            // root: {
            //     padding: '10px',
            // },
        },
        MuiDivider: {
            root: {
                backgroundColor: '#CCCCCC',
            },
        },
        MuiTypography: {
            h1: {
                fontSize: '96px',
                color: '#404040',
            },
            h2: {
                fontSize: '60px',
                color: '#404040',
            },
            h3: {
                fontSize: '48px',
                color: '#404040',
            },
            h4: {
                fontSize: '34px',
                color: '#404040',
            },
            h5: {
                fontSize: '24px',
                color: '#404040',
            },
            h6: {
                fontSize: '20px',
                color: '#404040',
            },
            subtitle1: {
                fontSize: '16px',
                color: '#404040',
            },
            subtitle2: {
                fontSize: '10px',
                color: '#404040',
            },
            body1: {
                fontSize: '14px',
                color: '#404040',
            },
            body2: {
                fontSize: '12px',
                color: '#404040',
            },
            button: {
                fontSize: '14px',
                fontVariant: 'small-caps',
                fontWeight: '500',
                color: '#989898',
            },
            caption: {
                fontSize: '14px',
                color: '#404040',
            },
            overline: {
                fontSize: '12px',
                fontVariant: 'small-caps',
                color: '#404040',
            },
        },
        MuiButton: {
            root: {
                color: '#ff146A',
            },
            outlined: {
                border: '1px solid #ff146A',
            },
        },
        // MuiPaper: {
        //     root: {
        //         display: 'inline-flex',
        //         marginLeft: '8px',
        //         marginRight: '8px',
        //     },
        // },
    },
    typography: {
        fontFamily: 'Poppins',
    },
});

const render = (messages) => {
    ReactDOM.render(
        <Provider store={store}>
            <LanguageProvider messages={messages}>
                <ConnectedRouter history={history}>
                    <MuiThemeProvider theme={theme}>
                        <div>
                            <NotificationContainer />
                            <App />
                        </div>
                    </MuiThemeProvider>
                </ConnectedRouter>
            </LanguageProvider>
        </Provider>,
        MOUNT_NODE
    );
};

initialiseApp();

if (module.hot) {
    // Hot reloadable React components and translation json files
    // modules.hot.accept does not accept dynamic dependencies,
    // have to be constants at compile-time
    module.hot.accept([
        './i18n',
        'containers/App',
    ], () => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render(translationMessages);
    });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
    (new Promise((resolve) => {
        resolve(import('intl'));
    }))
        .then(() => Promise.all([
            import('intl/locale-data/jsonp/en.js'),
        ]))
        .then(() => render(translationMessages))
        .catch((err) => {
            throw err;
        });
} else {
    render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
    require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
