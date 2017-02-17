import { mapStateToProps, mapDispatchToProps } from './TriangleEditor';
import { selectTriangle, unselectTriangle } from '../modules/uiState';
import reduce from '../modules/app';

describe('Triangle Editor', () => {
  describe('mapStateToProps', () => {
    it('Prints some hard-coded stuff for now', () => {
      const state = reduce();
      expect(mapStateToProps(state)).toEqual({
        a: { x: 20, y: 100 },
        b: { x: 60, y: 30 },
        c: { x: 100, y: 100 },
        labels: {
          a: { x: 10, y: 108 },
          b: { x: 102, y: 108 },
          c: { x: 54, y: 26 },
          ab: { x: 54, y: 116 },
          ac: { x: 16, y: 68 },
          bc: { x: 84, y: 68 },
        },
        selected: false,
      });
    });

    it('Passes the right "selected" prop', () => {
      const state1 = reduce();
      expect(mapStateToProps(state1).selected).toEqual(false);
      const state2 = reduce(state1, selectTriangle());
      expect(mapStateToProps(state2).selected).toEqual(true);
    });
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
