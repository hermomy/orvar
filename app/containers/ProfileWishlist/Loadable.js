/**
 *
 * Asynchronously loads the component for ProfileWishlist
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
