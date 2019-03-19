/**
 *
 * Asynchronously loads the component for LoginForm
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
