const {defaults} = require('jest-config');

module.exports = {
    globals: {
        ...defaults.globals,
        LOCAL_BACKEND_BASE_URL: 'http://localhost:3200',
    },
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
};
