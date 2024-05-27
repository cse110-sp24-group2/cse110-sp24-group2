import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: {
    globals: {
        ...globals.node,
        ...globals.browser
    }
  }},
  pluginJs.configs.recommended,
  {ignores: ["**/DevJournal-darwin*/", "**/DevJournal-win32*/", "**/node_modules/"]},
];