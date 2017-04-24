module.exports = {
    "env": {
        "browser": true,
        "jest": true,
    },
    "extends": "airbnb",
    "plugins": ["react", "jsx-a11y", "import"],
    "rules": {
      // Order of operations are not that difficult to understand
      "no-mixed-operators": "off",

      // It's clearer to define the most important function at the top of the
      // file and helper functions underneath. This is not a problem due to JS
      // hoisting.
      "no-use-before-define": ["error", { "functions": false }],

      // Allow importing dev dependencies in build & dev files
      "import/no-extraneous-dependencies": ["error", {
        "devDependencies": [
          "webpack.config.js",
          "src/index-hot.jsx",
          "webpack/*",
          "**/*.test.+(js|jsx)",
        ],
      }],
    },
};
