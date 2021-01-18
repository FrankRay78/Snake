
//nb. 'npx jest' from developer command prompt to run unit tests

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    "roots": [
        "<rootDir>/src"
    ],
    "testMatch": [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test|Tests).+(ts|tsx|js)"
    ],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
};