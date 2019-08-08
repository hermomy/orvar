/**
 *
 * Asynchronously loads the component for ProfileOrderList
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
