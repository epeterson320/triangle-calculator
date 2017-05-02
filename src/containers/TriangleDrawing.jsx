import React from 'react'
import PropTypes from 'prop-types'
import Triangle from '../geometry/Triangle'
import styles from './TriangleDrawing.scss'

const TriangleDrawing = ({ triangle }) => {
  const { a, b, c, label } = triangle
  const { xl, xr, yt, yb } = triangle.viewbox
  const svgViewbox = `0 0 ${xr - xl} ${yt - yb}`

  const ax = a.x - xl
  const ay = yt - a.y
  const bx = b.x - xl
  const by = yt - b.y
  const cx = c.x - xl
  const cy = yt - c.y
  const lax = label.a.x - xl
  const lay = yt - label.a.y
  const lbx = label.b.x - xl
  const lby = yt - label.b.y
  const lcx = label.c.x - xl
  const lcy = yt - label.c.y

  const fontSize = (yt - yb) / 5
  const dy = fontSize / 2

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={150} height={150} viewBox={svgViewbox}
      className={styles.svg}
    >
      <path
        d={`M ${ax},${ay} L ${bx},${by} L ${cx},${cy} Z`}
        className={styles.trianglePath}
      />
      <text className={styles.label} fontSize={fontSize} x={lax} y={lay} dy={dy}>a</text>
      <text className={styles.label} fontSize={fontSize} x={lbx} y={lby} dy={dy}>b</text>
      <text className={styles.label} fontSize={fontSize} x={lcx} y={lcy} dy={dy}>c</text>
    </svg>
  )
}

TriangleDrawing.propTypes = {
  triangle: PropTypes.instanceOf(Triangle).isRequired
}

export default TriangleDrawing
