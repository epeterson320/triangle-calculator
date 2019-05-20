import { init, pushStateToHistory } from './query';

describe('initialize', () => {
  it('Gets the url params and parses them into an action', () => {
    const location = { search: '?points=[P,Q,R]&P=90&PQ=12&PR=5' };
    const action = init(location);
    expect(action).toEqual({
      type: 'init/INIT',
      payload: {
        input: {
          A: '90',
          b: '5',
          c: '12',
        },
        labels: {
          A: 'P',
          B: 'Q',
          C: 'R',
        },
      },
    });
  });

  it('Handles two angles', () => {
    const location = { search: '?points=[P,Q,R]&P=90&Q=45&PR=5' };
    const action = init(location);
    expect(action).toEqual({
      type: 'init/INIT',
      payload: {
        input: {
          A: '90',
          B: '45',
          b: '5',
        },
        labels: {
          A: 'P',
          B: 'Q',
          C: 'R',
        },
      },
    });
  });

  it('Handles default points', () => {
    const location = { search: '?A=90&B=45&AB=5' };
    const action = init(location);
    expect(action).toEqual({
      type: 'init/INIT',
      payload: {
        input: {
          A: '90',
          B: '45',
          c: '5',
        },
        labels: {
          A: 'A',
          B: 'B',
          C: 'C',
        },
      },
    });
  });

  it('Handles decimal points', () => {
    const location = { search: '?A=90&B=45&AB=5.2' };
    const action = init(location);
    expect(action).toEqual({
      type: 'init/INIT',
      payload: {
        input: {
          A: '90',
          B: '45',
          c: '5.2',
        },
        labels: {
          A: 'A',
          B: 'B',
          C: 'C',
        },
      },
    });
  });
});

describe('pushStateToHistory', () => {
  it('Stringifies the state correctly and pushes it to the browser history', () => {
    const history = { replaceState: jest.fn() };
    const location = {
      origin: 'http://example.com',
      pathname: '/route',
    };
    const state = {
      input: { A: '30', B: '60' },
      labels: { A: 'P', B: 'Q', C: 'R' },
    };
    pushStateToHistory({ history, location })(state);
    expect(history.replaceState).toHaveBeenCalledWith(
      null,
      '',
      'http://example.com/route?points=[P,Q,R]&P=30&Q=60',
    );
  });

  it('Omits the labels when they are the defaults', () => {
    const history = { replaceState: jest.fn() };
    const location = {
      origin: 'http://example.com',
      pathname: '/route',
    };
    const state = {
      input: { A: '30', b: '10', c: '10' },
      labels: { A: 'A', B: 'B', C: 'C' },
    };
    pushStateToHistory({ history, location })(state);
    expect(history.replaceState).toHaveBeenCalledWith(
      null,
      '',
      'http://example.com/route?A=30&AB=10&AC=10',
    );
  });
});
