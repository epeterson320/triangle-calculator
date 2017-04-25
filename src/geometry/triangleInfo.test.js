import test from 'tape';
import { canInferTriangle } from './triangleInfo';

const c = 1;
const b = 2;
const a = Math.sqrt(3);
const A = Math.PI / 3;
const B = Math.PI / 2;
const C = Math.PI / 6;

test('Can infer from 3 sides', (t) => {
  t.true(canInferTriangle({ a, b, c }));
  t.end();
});

test('Can infer from 2 sides and 1 angle', (t) => {
  t.true(canInferTriangle({ a, b, A }));
  t.end();
});

test('Can\'t infer from 3 angles and no sides', (t) => {
  t.false(canInferTriangle({ A, B, C }));
  t.end();
});
