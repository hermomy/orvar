import { injectGlobal } from 'styled-components';

import theme from 'theme';
import 'global-styles.scss';

/* eslint no-unused-expressions: 0 */
injectGlobal`
    html,
    body {
        height: 100%;
        width: 100%;
    }

    body {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    body.fontLoaded {
        font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    #app {
        background-color: #fafafa;
        min-height: 100%;
        min-width: 100%;
    }

    p,
    label {
        font-family: Georgia, Times, 'Times New Roman', serif;
        line-height: 1.5em;
    }

    .text-white {
        color: white;
    }

    .text-hover-hermo-pink:hover,
    .text-hover-hermo-pink:focus {
        color: #FF0066;
    }

    .text-main-color {
        color: ${theme.main_color};
    }

    .bg-main-color {
        background-color: ${theme.main_bg};
    }

    .text-secondary-color {
        color: ${theme.secondary_color};
    }

    .bg-secondary-color {
        background-color: ${theme.secondary_bg};
    }

    .text-tertiary-color {
        color: ${theme.tertiary_color};
    }

    .bg-tertiary-color {
        background-color: ${theme.tertiary_bg};
    }

    .bg-white {
        background-color: white;
    }
`;
