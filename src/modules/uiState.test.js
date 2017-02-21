import reduce, {
  selectTriangle,
  unselectTriangle,
  SELECT_TRIANGLE,
  UNSELECT_TRIANGLE,
} from './uiState';

describe('Calculator UI', () => {
  describe('reducer', () => {
    it('should select and unselect the triangle', () => {
      const state1 = reduce(undefined, selectTriangle());
      expect(state1.selected).toBe('triangle');
      const state2 = reduce(state1, unselectTriangle());
      expect(state2.selected).toBeFalsy();
    });
  });

  describe('action creators', () => {
    it('should create an action to select the triangle', () => {
      expect(selectTriangle()).toEqual({ type: SELECT_TRIANGLE });
    });

    it('should create an action to unselect the triangle', () => {
      expect(unselectTriangle()).toEqual({ type: UNSELECT_TRIANGLE });
    });
  });
});
