module.exports = {
  "globals": {
    "ts-jest": {
      "tsConfigFile": "tsconfig.json"
    }
  },
  "mapCoverage": true,
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}"
  ],
  "setupFiles": [
    "<rootDir>/config/polyfills.js"
  ],
  "moduleFileExtensions": [
    "ts",
    "js",
    "tsx",
    "js",
    "jsx",
    "json"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "./node_modules/ts-jest/preprocessor.js"
  },
  "testMatch": [
    "<rootDir>/src/**/__tests__/**/*.ts?(x)",
    "<rootDir>/src/**/?(*.)(spec|test).ts?(x)"
  ],
  "testEnvironment": "node",
  "testURL": "http://localhost",
  "transform": {
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^.+\\.tsx?$": "<rootDir>/config/jest/typescriptTransform.js",
    "^(?!.*\\.(css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$"
  ],
  "moduleNameMapper": {
    "^react-native$": "react-native-web"
  },
  "verbose": true
}
