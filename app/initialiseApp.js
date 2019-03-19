import globalScope from 'globalScope';
import { getCookie } from 'globalUtils';
// import { alertMsg } from '@tienping/my-react-kit';

const initialiseApp = () => {
    globalScope.token = getCookie(process.env.TOKEN_KEY);
    globalScope.isAdmin = getCookie(process.env.ADMIN_KEY);

    // alertMsg();
};

export default initialiseApp;
