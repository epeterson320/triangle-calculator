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
      expect(solve({ A, C }).computed.B).toBeCloseTo(parseFloat(B))
      expect(solve({ B, C }).computed.A).toBeCloseTo(parseFloat(A))
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
      expect(solve({ a: 'Hello', A: 'Hi', b: '13' }).errors)
        .toEqual({ a: NonNumberInput, A: NonNumberInput })

      expect(solve({ b: 'Q', B: 'Hi', c: 'zz', C: ':)' }).errors)
        .toEqual({ b: NonNumberInput, B: NonNumberInput, c: NonNumberInput, C: NonNumberInput })
    })

    it('Flags sides that are too short (3 sides)', () => {
      const long = '50'
      const short = '7'
      expect(solve({ a: long, b: short, c: short }).errors)
        .toEqual({ a: SideTooLong, b: SideTooShort, c: SideTooShort })
      expect(solve({ b: long, a: short, c: short }).errors)
        .toEqual({ b: SideTooLong, a: SideTooShort, c: SideTooShort })
      expect(solve({ c: long, b: short, a: short }).errors)
        .toEqual({ c: SideTooLong, b: SideTooShort, a: SideTooShort })
    })

    it('Flags sides that are too short (2 sides 1 angle)', () => {
      const shorter = '1'
      const longer = '10'
      const angle = '1.5708'
      expect(solve({ A: angle, b: longer, a: shorter }).errors)
        .toEqual({ a: SideTooShort, b: SideTooLong })
      expect(solve({ B: angle, a: longer, b: shorter }).errors)
        .toEqual({ b: SideTooShort, a: SideTooLong })
      expect(solve({ A: angle, c: longer, a: shorter }).errors)
        .toEqual({ a: SideTooShort, c: SideTooLong })
      expect(solve({ C: angle, a: longer, c: shorter }).errors)
        .toEqual({ c: SideTooShort, a: SideTooLong })
      expect(solve({ B: angle, c: longer, b: shorter }).errors)
        .toEqual({ b: SideTooShort, c: SideTooLong })
      expect(solve({ C: angle, b: longer, c: shorter }).errors)
        .toEqual({ c: SideTooShort, b: SideTooLong })
    })

    it('Flags angles that add up to 180 or more', () => {
      const obtuse = '1.5708'
      expect(solve({ A: obtuse, B: obtuse }).errors)
        .toEqual({ A: AngleSumTooLarge, B: AngleSumTooLarge })
      expect(solve({ A: obtuse, C: obtuse }).errors)
        .toEqual({ A: AngleSumTooLarge, C: AngleSumTooLarge })
      expect(solve({ B: obtuse, C: obtuse }).errors)
        .toEqual({ B: AngleSumTooLarge, C: AngleSumTooLarge })
    })

    it('Flags angles that are not between 0 and 180, exclusive', () => {
      expect(solve({ A: '180', unit: DEG }).errors.A).toEqual(InvalidAngle)
      expect(solve({ B: '3.15', unit: RAD }).errors.B).toEqual(InvalidAngle)
      expect(solve({ C: '0', unit: RAD }).errors.C).toEqual(InvalidAngle)
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

    it('Returns an alternate when given an SSA', () => {
      const shorter = 2
      const longer = 3
      const angle = PI / 8

      const tests = [
        { a: shorter, b: longer, A: angle },
        { a: longer, b: shorter, B: angle },
        { a: shorter, c: longer, A: angle },
        { a: longer, c: shorter, C: angle },
        { b: shorter, c: longer, B: angle },
        { b: longer, c: shorter, C: angle }
      ]

      tests.forEach(input => {
        const alternate = solve(input).alternate
        expect(alternate).not.toBe(null)
        expect(alternate).toBeValidTriangle()
      })
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
