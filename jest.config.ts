import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.module\\.css$": "<rootDir>/src/__mocks__/styleMock.ts",
    "\\.(svg|png|jpg)$": "<rootDir>/src/__mocks__/fileMock.ts",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;
