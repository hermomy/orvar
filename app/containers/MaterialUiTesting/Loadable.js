/**
 *
 * Asynchronously loads the component for MaterialUiTesting
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
