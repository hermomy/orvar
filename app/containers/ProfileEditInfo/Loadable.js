/**
 *
 * Asynchronously loads the component for ProfileEditInfo
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
