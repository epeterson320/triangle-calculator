import reduce, * as display from './display';

describe('Reducer', () => {
  it('returns an initial state', () => {
    const state = reduce();
    expect(state).toBeDefined();
  });

  it('toggles the display of the circumcenter', () => {
    expect(reduce(undefined, display.showCCenter(true)).cCenter).toBe(true);
    expect(reduce(undefined, display.showCCenter(false)).cCenter).toBe(false);
  });

  it('toggles the display of the incenter', () => {
    expect(reduce(undefined, display.showICenter(true)).iCenter).toBe(true);
    expect(reduce(undefined, display.showICenter(false)).iCenter).toBe(false);
  });

  it('toggles the display of the orthocenter', () => {
    expect(reduce(undefined, display.showOCenter(true)).oCenter).toBe(true);
    expect(reduce(undefined, display.showOCenter(false)).oCenter).toBe(false);
  });

  it('toggles the display of the centroid', () => {
    expect(reduce(undefined, display.showCentroid(true)).centroid).toBe(true);
    expect(reduce(undefined, display.showCentroid(false)).centroid).toBe(false);
  });

  it('toggles the display of the Euler line', () => {
    expect(reduce(undefined, display.showEuler(true)).euler).toBe(true);
    expect(reduce(undefined, display.showEuler(false)).euler).toBe(false);
  });
});
