import solve, {
  NonNumberInput,
  SideTooShort,
  SideTooLong,
  AngleSumTooLarge,
  InvalidAngle
} from './solveTriangle'
import { DEG, RAD } from '../constants'

const { sqrt, PI } = Math

const c = '1'
const b = sqrt(3).toString()
const a = '2'
const A = (PI / 2).toString()
const B = (PI / 3).toString()
const C = (PI / 6).toString()

describe('Triangle Solution selector', () => {
  describe('Can/Cannot solve', () => {
    it('Can be solved from 3 sides', () => {
      expect(solve({ a, b, c }).isSolved).toBe(true)
    })

    it('Can be solved from 2 sides and 1 angle', () => {
      expect(solve({ a, b, C }).isSolved).toBe(true)
    })

    it('Can be solved from 1 angle and 2 sides', () => {
      expect(solve({ a, B, c }).isSolved).toBe(true)
    })

    it('Cannot be solved from 3 angles', () => {
      expect(solve({ A, B, C }).isSolved).toBe(false)
    })
  })

  describe('Computed measurements', () => {
    it('Can get 3rd angle from incomplete measurements', () => {
      expect(solve({ A, B }).computed.C).toBeCloseTo(parseFloat(C))
      expect(solve({ A, B: '', C }).computed.B).toBeCloseTo(parseFloat(B))
    })

    it('Returns nothing given invalid input', () => {
      expect(solve({ A: '90', B: '90', unit: DEG }).computed).toEqual({
        a: 0, b: 0, c: 0, A: 0, B: 0, C: 0
      })
    })

    it('Won\'t assume missing measurements', () => {
      expect(solve({ A, B }).computed).not.toBeValidTriangle()
    })

    it('Works with three sides', () => {
      expect(solve({ a, b, c }).computed).toBeValidTriangle()
    })

    it('Works with 2 sides and 1 common angle', () => {
      expect(solve({ a, b, C }).computed).toBeValidTriangle()
      expect(solve({ a, c, B }).computed).toBeValidTriangle()
      expect(solve({ b, c, A }).computed).toBeValidTriangle()
    })

    it('Works with 2 sides and 1 uncommon angle', () => {
      expect(solve({ a, b, A }).computed).toBeValidTriangle()
      expect(solve({ a, c, C }).computed).toBeValidTriangle()
      expect(solve({ b, c, C }).computed).toBeValidTriangle()
    })

    it('Works with 2 angles and 1 side', () => {
      expect(solve({ A, B, a }).computed).toBeValidTriangle()
      expect(solve({ A, B, b }).computed).toBeValidTriangle()
      expect(solve({ A, C, a }).computed).toBeValidTriangle()
      expect(solve({ A, C, b }).computed).toBeValidTriangle()
      expect(solve({ B, C, a }).computed).toBeValidTriangle()
      expect(solve({ B, C, c }).computed).toBeValidTriangle()
    })

    it('Works with degrees', () => {
      const actual = solve({ A: '90', B: '60', a: '2', unit: DEG }).computed
      const expected = { A: PI / 2, B: PI / 3, C: PI / 6, a: 2, b: sqrt(3), c: 1 }
      expect(actual).toCloseEqual(expected)
    })
  })

  describe('Errors', () => {
    it('Returns null when there are no errors', () => {
      expect(solve({}).errors).toEqual({})
    })

    it('Does not treat the empty string as an error', () => {
      expect(solve({ a: '', A: '' }).errors).toEqual({})
    })

    it('Flags invalid and unknown input', () => {
      expect(solve({ a: 'Hello' }).errors).toEqual({ a: NonNumberInput })
    })

    it('Flags sides that are too short (3 sides)', () => {
      expect(solve({ a: '50', b: '7', c: '7' }).errors)
        .toEqual({
          a: SideTooLong,
          b: SideTooShort,
          c: SideTooShort
        })
    })

    it('Flags sides that are too short (2 sides 1 angle)', () => {
      expect(solve({ A: '1.5708', b: '10', a: '1' }).errors)
        .toEqual({ a: SideTooShort })
    })

    it('Flags angles that add up to 180 or more', () => {
      expect(solve({ A: '1.5708', B: '1.5708' }).errors)
        .toEqual({ A: AngleSumTooLarge, B: AngleSumTooLarge })
    })

    it('Flags angles that are not between 0 and 180, exclusive', () => {
      expect(solve({ A: '180', unit: DEG }).errors.A).toEqual(InvalidAngle)
      expect(solve({ A: '3.15', unit: RAD }).errors.A).toEqual(InvalidAngle)
      expect(solve({ A: '0', unit: RAD }).errors.A).toEqual(InvalidAngle)
      expect(solve({ A: '-0.2', unit: RAD }).errors.A).toEqual(InvalidAngle)
    })
  })

  describe('Alternate Solution', () => {
    it('Returns null if the solution is incomplete', () => {
      expect(solve({ A, B }).alternate).toBeNull()
    })

    it('Returns null if the solution is not ambiguous', () => {
      expect(solve({ a, b, c }).alternate).toBeNull()
    })

    it('Solves for the larger triangle in a SSA solution', () => {
      expect(solve({ b, c, C }).computed).toCloseEqual({
        a: parseFloat(a),
        b: parseFloat(b),
        c: parseFloat(c),
        A: parseFloat(A),
        B: parseFloat(B),
        C: parseFloat(C)
      })
    })

    it('Provides the smaller triangle as an alternate', () => {
      expect(solve({ b, c, C }).alternate).toCloseEqual({
        A: PI / 6,
        B: PI * 2 / 3,
        C: PI / 6,
        a: 1,
        b: sqrt(3),
        c: 1
      })
    })
  })
})
