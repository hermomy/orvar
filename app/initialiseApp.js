import globalScope from 'globalScope';
import { getCookie } from 'globalUtils';
import { create } from 'apisauce';
// import { alertMsg } from '@tienping/my-react-kit';

const initialiseApp = () => {
    globalScope.token = getCookie(process.env.TOKEN_KEY);
    globalScope.isAdmin = getCookie(process.env.ADMIN_KEY);

    globalScope.axios = create({
        baseURL: globalScope.api,
        headers: {
            'hertoken': globalScope.token,
            'Content-Type': 'application/json',
            'Accept-Language': 'en',
        //     // 'api-version': '1.0.0',
        //     // 'app-version': DeviceInfo.getVersion(),
        //     // 'app-os-name': 'Platform.OS',
        //     // 'app-os-version': DeviceInfo.getSystemVersion(),
        },
        // timeout: 30000,
    });
    // alertMsg();
};

export default initialiseApp;
