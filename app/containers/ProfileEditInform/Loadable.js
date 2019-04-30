/**
 *
 * Asynchronously loads the component for ProfileEditInform
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
