import { mapStateToProps, mapDispatchToProps } from './TriangleEditor';
import { selectTriangle, unselectTriangle } from '../modules/uiState';
import reduce from '../modules/app';

function dist(p, q) {
  const dx = q.x - p.x;
  const dy = q.y - p.y;
  return Math.sqrt((dx * dx) + (dy * dy));
}

describe('Triangle Editor', () => {
  describe('mapStateToProps', () => {
    it('Gives back data in the right shape', () => {
      const state = reduce();
      const props = mapStateToProps(state);
      expect(props.a).toBeDefined();
      expect(props.b).toBeDefined();
      expect(props.c).toBeDefined();
      expect(props.labels).toBeDefined();
      expect(props.selected).toBeDefined();
    });

    it('Passes the right "selected" prop', () => {
      const state1 = reduce();
      expect(mapStateToProps(state1).selected).toEqual(false);
      const state2 = reduce(state1, selectTriangle());
      expect(mapStateToProps(state2).selected).toEqual(true);
    });

    it('Shows an equilateral triangle when no measurements are set', () => {
      const { a, b, c } = mapStateToProps(reduce());
      const lAB = dist(a, b);
      const lAC = dist(a, c);
      const lBC = dist(b, c);
      expect(lAB).toBeCloseTo(lAC);
      expect(lAB).toBeCloseTo(lBC);
      expect(lAC).toBeCloseTo(lBC);
    });

    it('Should scale down huge measurements');
  });

  describe('mapDispatchToProps', () => {
    it('Dispatches select triangle when clicked', () => {
      const dispatch = jest.fn();
      const props = mapDispatchToProps(dispatch);
      props.onClickTriangle();
      expect(dispatch.mock.calls[0][0]).toEqual(selectTriangle());
    });

    it('Dispatches unselect triangle when the background is clicked', () => {
      const dispatch = jest.fn();
      const props = mapDispatchToProps(dispatch);
      props.onClickBackground();
      expect(dispatch.mock.calls[0][0]).toEqual(unselectTriangle());
    });
  });
});
