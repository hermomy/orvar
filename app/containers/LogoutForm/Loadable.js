/**
 *
 * Asynchronously loads the component for LogoutForm
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
