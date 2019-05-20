import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { precision as δ } from '../src/constants';

configure({ adapter: new Adapter() });

const { PI, sin } = Math;

function eql(a, b) {
  return -δ < a - b && a - b < δ;
}

expect.extend({
  /**
   * Passes if the measurements are all defined and they describe a
   * geometrically valid triangle. Fails otherwise.
   */
  toBeValidTriangle({ a, b, c, A, B, C }) {
    const defined = a && b && c && A && B && C;
    const passAngleSum = eql(A + B + C, PI);
    const lengths = a + b > c && a + c > b && b + c > a;
    const lawOfSines =
      eql(sin(A) / a, sin(B) / b) && eql(sin(A) / a, sin(C) / c);

    const pass = !!(defined && passAngleSum && lengths && lawOfSines);

    return pass
      ? { message: () => 'expected an invalid triangle', pass }
      : { message: () => 'expected a valid triangle', pass };
  },

  toCloseEqual(actual, expected) {
    let pass = true;
    let badKey = null;
    let actVal = 0;
    let expVal = 0;

    Object.keys(expected).forEach(key => {
      if (!eql(actual[key], expected[key])) {
        pass = false;
        badKey = key;
        actVal = actual[key];
        expVal = expected[key];
      }
    });

    return {
      pass,
      message: !pass
        ? () =>
            `Expected the value for property "${badKey}" to be:\n` +
            `  ${expVal}\n` +
            `Received:\n` +
            `  ${actVal}`
        : () => `Expected objects to have different values`,
    };
  },
});
