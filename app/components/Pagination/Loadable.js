/**
 *
 * Asynchronously loads the component for NewPagination
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
