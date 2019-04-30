/**
 *
 * Asynchronously loads the component for ProfileOrder
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
