const globalScope = {
    token: '',
    isAdmin: false,
    api: process.env.API_URL,
    fb_id: process.env.FACEBOOK_APP_ID,
    previousPage: '',
    config: {},
    axios: null, // create in initialiseApp.js
};

export default globalScope;
