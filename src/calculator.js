// Actions
const MOVE = 'trig/triangle/MOVE';

const init = {
  a: { x: 10, y: 108 },
  b: { x: 102, y: 108 },
  c: { x: 54, y: 116 },
};

// Reducer
export default function reducer(state = init, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case MOVE:
      return state;
    default:
      return state;
  }
}

// Action Creators
export function move() {
  return { type: MOVE };
}
/*
Actions:
Set side, set angle, unset side, unset angle.
Rename point
drag point
select triangle for rotation
drag rotate triangle
drag translate triangle
select view.
toggle show work.

Views (2 screens on mobile, 1 screen on tablet).
Edit (Drag point, input boxes for measurements)
Results (Scrolling text view showing work)

App State
Point Names, default A, B, C.
Set measurements, default none (up to 3 sides, 2 sides & 1 angle, 1 side & 2 angles. Translate XY.
Rotate θ.*/
