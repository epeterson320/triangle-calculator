require('babel-register');
const test = require('tape');
const mockCssModules = require('mock-css-modules');

test.Test.prototype.inDelta = function inDelta(actual, expected) {
  // eslint-disable-next-line no-underscore-dangle
  this._assert(expected - 1e-6 < actual && actual < expected + 1e-6, {
    message: 'should be in delta',
    operator: 'inDelta',
    actual,
    expected,
  });
};

mockCssModules.register('.scss');
