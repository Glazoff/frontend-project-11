import globals from "globals";
import js from "@eslint/js";
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser },
    plugins: { '@stylistic': stylistic },
    rules: { '@stylistic/indent': ['error', 2], }
  },
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
]);
