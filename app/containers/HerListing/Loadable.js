/**
 *
 * Asynchronously loads the component for HerListing
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
