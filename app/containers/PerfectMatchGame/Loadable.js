/**
 *
 * Asynchronously loads the component for PerfectMatchGame
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
