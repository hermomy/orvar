/**
 *
 * Asynchronously loads the component for FilterSort
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
