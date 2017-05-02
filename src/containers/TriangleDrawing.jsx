import React from 'react'
import { connect } from 'react-redux'
import Triangle from '../geometry/Triangle'
import styles from './TriangleDrawing.scss'
import { getErrors, canInferAll } from '../geometry/triangleInfo'

const PI = Math.PI

const TriangleDrawing = (m) => {
  if (getErrors(m) || !canInferAll(m)) {
    return (
      <div className={styles.container}>
        <p>Not enough measurements to complete triangle.</p>
      </div>
    )
  }
  const triangle = Triangle.FromMetrics(m)
  const { a, b, c, ab, ba, ac, ca, bc, cb, p, label } = triangle
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

  const fontSize = (yt - yb) / 10
  const dy = fontSize / 3

  const lA = a.movePolar((ba.angle + ca.angle) / 2, p * 0.05)
  const lAx = lA.x - xl
  const lAy = yt - lA.y
  const lC = c.movePolar((ac.angle + bc.angle) / 2, p * 0.05)
  const lCx = lC.x - xl
  const lCy = yt - lC.y
  const lB = b.movePolar((ab.angle + cb.angle) / 2 + PI, p * 0.05)
  const lBx = lB.x - xl
  const lBy = yt - lB.y
  return (
    <div className={styles.container}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={300} height={300} viewBox={svgViewbox}
        className={styles.svg}
      >
        <path
          d={`M ${ax},${ay} L ${bx},${by} L ${cx},${cy} Z`}
          className={styles.trianglePath}
        />
        <text className={styles.label} fontSize={fontSize} x={lax} y={lay} dy={dy}>a</text>
        <text className={styles.label} fontSize={fontSize} x={lbx} y={lby} dy={dy}>b</text>
        <text className={styles.label} fontSize={fontSize} x={lcx} y={lcy} dy={dy}>c</text>

        <text className={styles.label} fontSize={fontSize} x={lAx} y={lAy} dy={dy}>A</text>
        <text className={styles.label} fontSize={fontSize} x={lBx} y={lBy} dy={dy}>B</text>
        <text className={styles.label} fontSize={fontSize} x={lCx} y={lCy} dy={dy}>C</text>

        <clipPath id='triangleClip'>
          <path d={`M ${ax},${ay} L ${bx},${by} L ${cx},${cy} Z`} />
        </clipPath>
        <circle className={styles.arc} cx={ax} cy={ay} r={fontSize * 0.7} clipPath='url(#triangleClip)' />
        <circle className={styles.arc} cx={bx} cy={by} r={fontSize * 0.7} clipPath='url(#triangleClip)' />
        <circle className={styles.arc} cx={cx} cy={cy} r={fontSize * 0.7} clipPath='url(#triangleClip)' />
      </svg>
    </div>
  )
}

export default connect()(TriangleDrawing)
