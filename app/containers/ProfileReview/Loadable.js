/**
 *
 * Asynchronously loads the component for ProfileReview
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
