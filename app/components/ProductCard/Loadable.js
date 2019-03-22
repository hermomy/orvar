/**
 *
 * Asynchronously loads the component for ProductCard
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
