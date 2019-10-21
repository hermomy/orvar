const globalScope = {
    token: '',
    isAdmin: false,
    profile: {},
    api: process.env.API_URL,
    previousPage: '',
    config: {},
    axios: null, // create in initialiseApp.js
    fb_id: process.env.FACEBOOK_APP_ID,
};

export default globalScope;
