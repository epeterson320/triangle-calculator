module.exports = {
    "env": {
        "browser": true,
        "jest": true,
    },
    "extends": "airbnb",
    "plugins": ["react", "jsx-a11y", "import"],
    "rules": {
      "import/no-extraneous-dependencies": ["error", {
        "devDependencies": ["**/*.test.+(js|jsx)"]
      }]
    }
};
