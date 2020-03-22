module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:compat/recommended",
  ],
  "env": {
    "browser": true,
    "es6": true,
  },
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
  },
  "rules": {
    "indent": [
      "off", 2, { "SwitchCase": 1 },
    ],
    "linebreak-style": [
      "error", "windows",
    ],
    "quotes": [
      "warn", "single", { "allowTemplateLiterals": true },
    ],
    "semi": ["warn", "always"],
    "no-extra-boolean-cast": "off",
    "no-console": "warn",
    "no-unused-vars": "warn",
    "no-undef": "warn",
    "compat/compat": ["warn"],
    "no-unreachable": ["warn"],
    "no-self-assign": ["off"],
    "no-useless-escape": ["off"],
    "eol-last": ["warn", "always"],
  },
};
