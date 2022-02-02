module.exports = {
  transform: {
    '.*\\.ts$': 'ts-jest',
    '.*\\.tsx$': 'ts-jest',
    '.*\\.js$': 'ts-jest',
    ".+\\.(css|styl|less|sass|scss)$": "<rootDir>/node_modules/jest-css-modules-transform",
    "\\.svg$": "svg-jest"
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'js', 'tsx'],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@store(.*)$": "<rootDir>/src/core/redux/$1",
    "^@components(.*)$": "<rootDir>/src/components/$1"
  }
}