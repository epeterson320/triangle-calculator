export const init = location => {
  const query = location.search.slice(1) || ''; // slice(1) to remove leading '?'

  const labelsRe = /points=\[(\w),(\w),(\w)\]/g;
  const points = labelsRe.exec(query);
  const labels = { A: 'A', B: 'B', C: 'C' };
  const input = {};
  const pointsByLabel = {};
  const sidesByLabel = {};

  if (points) {
    if (points[1]) {
      labels.A = points[1];
    }
    if (points[2]) {
      labels.B = points[2];
    }
    if (points[3]) {
      labels.C = points[3];
    }
  }

  Object.keys(labels).forEach(key => {
    pointsByLabel[labels[key]] = key;
  });
  if (labels.A && labels.B) sidesByLabel[labels.A + labels.B] = 'c';
  if (labels.A && labels.C) sidesByLabel[labels.A + labels.C] = 'b';
  if (labels.B && labels.C) sidesByLabel[labels.B + labels.C] = 'a';

  const anglesRe = /\b(\w)=([0-9.]+)\b/g;
  let angles = null;
  while ((angles = anglesRe.exec(query)) !== null) {
    if (angles[1] && angles[2]) {
      input[pointsByLabel[angles[1]]] = angles[2];
    }
  }

  const lengthsRe = /\b(\w{2})=([0-9.]+)\b/g;
  let lengths = null;
  while ((lengths = lengthsRe.exec(query)) !== null) {
    if (lengths[1] && lengths[2]) {
      input[sidesByLabel[lengths[1]]] = lengths[2];
    }
  }

  return { type: 'init/INIT', payload: { input, labels } };
};

export const pushStateToHistory = ({ history, location }) => state => {
  const query = stateToQueryString(state);
  const url = location.origin + location.pathname + '?' + query;
  history.replaceState(null, '', url);
};

const stateToQueryString = ({ input, labels }) => {
  const params = [];
  if (labels.A !== 'A' || labels.B !== 'B' || labels.C !== 'C') {
    params.push({
      key: 'points',
      value: `[${labels.A},${labels.B},${labels.C}]`,
    });
  }

  const { A, B, C, a, b, c } = input;
  if (A) params.push({ key: labels.A, value: A });
  if (B) params.push({ key: labels.B, value: B });
  if (C) params.push({ key: labels.C, value: C });
  if (c) params.push({ key: labels.A + labels.B, value: c });
  if (b) params.push({ key: labels.A + labels.C, value: b });
  if (a) params.push({ key: labels.B + labels.C, value: a });

  return params.map(({ key, value }) => `${key}=${value}`).join('&');
};
