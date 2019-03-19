/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { staticErrorResponse } from 'globalUtils';
import ErrorMessage from 'components/ErrorMessage';

export default class NotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        const message = staticErrorResponse({ text: 'The URL is invalid.' });
        return (
            <section className="container pt-5 text-center">
                <ErrorMessage type="info" error={message} />
            </section>
        );
    }
}
