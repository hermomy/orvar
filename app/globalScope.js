const globalScope = {
    token: '',
    isAdmin: false,
    api: process.env.API_URL,
    previousPage: '',
    config: {},
    axios: null, // create in initialiseApp.js
};

export default globalScope;
