/**
 *
 * Asynchronously loads the component for OnboardingPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
