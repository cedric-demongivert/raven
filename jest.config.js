module.exports = {
  "transform": {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest"
  },
  "testPathIgnorePatterns": [
    "/node_modules",
    "/distribution",
    "/sources"
  ],
  "moduleNameMapper": {
    '^@library/(.*)$': '<rootDir>/sources/typescript/$1',
    '^@library$': '<rootDir>/sources/typescript/index',
    '^@grammar/(.*)$': '<rootDir>/sources/generated/$1'
  }
}
