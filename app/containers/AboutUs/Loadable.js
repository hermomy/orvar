/**
 *
 * Asynchronously loads the component for AboutUs
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
