/**
 *
 * Asynchronously loads the component for FacebookButton
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
