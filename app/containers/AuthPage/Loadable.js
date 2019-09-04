/**
 *
 * Asynchronously loads the component for AuthPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
