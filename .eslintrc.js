module.exports = {
    "env": {
        "browser": true,
        "jest": true,
    },
    "extends": "airbnb",
    "plugins": ["react", "jsx-a11y", "import"],
    "rules": {
      // `a + b - c` does not need to be `(a + b) - c` to be unambiguous
      "no-mixed-operators": ["error", { "allowSamePrecedence": true}],

      // It's clearer to define the most important function at the top of the
      // file and helper functions underneath. This is not a problem due to JS
      // hoisting.
      "no-use-before-define": ["error", { "functions": false }],
      
      // Allow importing dev dependencies in build & dev files
      "import/no-extraneous-dependencies": ["error", {
        "devDependencies": [
          "**/*.test.+(js|jsx)",
          "index-hot.jsx",
          "webpack.config.js",
          "**/webpack/*.js",
        ],
      }],
    },
};
