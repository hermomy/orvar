/**
 *
 * Asynchronously loads the component for BrandPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
