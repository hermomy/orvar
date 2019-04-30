/**
 *
 * Asynchronously loads the component for FeedbackPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
