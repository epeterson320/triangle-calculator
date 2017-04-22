import React from 'react';

const TriangleDrawing = ({ triangle }) => {
  return <code>{JSON.stringify(triangle, null, 2)}</code>;
  /*
  const { a, b, c } = triangle;
  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      <path d={`M ${a.x},${a.y} L ${b.x},${b.y} L ${c.x},${c.y} Z`} />
    </svg>
  );
  */
};

export default TriangleDrawing;
