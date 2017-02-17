import reduce from './app';

describe('Root reducer', () => {
  it('should return state with the right fields', () => {
    const state = reduce();
    expect(state.uiState).toBeDefined();
    expect(state.measurements).toBeDefined();
  });
});
