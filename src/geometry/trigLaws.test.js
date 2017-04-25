import test from 'tape';
import {
  ABCfromabc,
  ABcfromabC,
  BcCfromabA,
  bcfromaABC,
} from './trigLaws';

const C = Math.PI / 6;
const B = Math.PI / 3;
const A = Math.PI / 2;
const a = 2;
const b = Math.sqrt(3);
const c = 1;

test('Finds the angles from 3 sides', (t) => {
  const expected = [A, B, C];
  ABCfromabc(a, b, c)
    .forEach((angle, i) => { t.inDelta(angle, expected[i]); });
  t.end();
});

test('Finds the third side from 2 sides with a common angle', (t) => {
  const expected = [A, B, c];
  ABcfromabC(a, b, C)
    .forEach((metric, i) => { t.inDelta(metric, expected[i]); });
  t.end();
});

test('Finds the measurements from 2 sides with an uncommon angle', (t) => {
  const actual = BcCfromabA(a, b, A);
  const expected = [B, c, C];
  Object.keys(expected)
    .forEach((key) => { t.inDelta(actual[key], expected[key]); });
  t.end();
});

test('Finds the measurements from 3 angles and any side', (t) => {
  const actual = bcfromaABC(a, A, B, C);
  const expected = [b, c];
  Object.keys(expected)
    .forEach((key) => { t.inDelta(actual[key], expected[key]); });
  t.end();
});
