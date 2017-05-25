import init from './init'

describe('initialize', () => {
  it('Gets the url params and parses them into an action', () => {
    const location = { search: '?points=[P,Q,R]&P=90&PQ=12&PR=5' }
    const action = init(location)
    expect(action).toEqual({
      type: 'init/INIT',
      payload: {
        input: {
          A: '90',
          b: '5',
          c: '12'
        },
        labels: {
          A: 'P',
          B: 'Q',
          C: 'R'
        }
      }
    })
  })

  it('Handles two angles', () => {
    const location = { search: '?points=[P,Q,R]&P=90&Q=45&PR=5' }
    const action = init(location)
    expect(action).toEqual({
      type: 'init/INIT',
      payload: {
        input: {
          A: '90',
          B: '45',
          b: '5'
        },
        labels: {
          A: 'P',
          B: 'Q',
          C: 'R'
        }
      }
    })
  })

  it('Handles default points', () => {
    const location = { search: '?A=90&B=45&AB=5' }
    const action = init(location)
    expect(action).toEqual({
      type: 'init/INIT',
      payload: {
        input: {
          A: '90',
          B: '45',
          c: '5'
        },
        labels: {
          A: 'A',
          B: 'B',
          C: 'C'
        }
      }
    })
  })

  it('Handles decimal points', () => {
    const location = { search: '?A=90&B=45&AB=5.2' }
    const action = init(location)
    expect(action).toEqual({
      type: 'init/INIT',
      payload: {
        input: {
          A: '90',
          B: '45',
          c: '5.2'
        },
        labels: {
          A: 'A',
          B: 'B',
          C: 'C'
        }
      }
    })
  })
})
