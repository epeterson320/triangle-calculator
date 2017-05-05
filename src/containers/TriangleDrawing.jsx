import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import Triangle from '../geometry/Triangle'
import styles from './TriangleDrawing.scss'
import { getErrors, canInferAll } from '../geometry/triangleInfo'

const { PI, abs } = Math
const rt = PI / 2

const TriangleDrawing = ({ triangle, labels }) => {
  if (!triangle) {
    return (
      <div className={styles.container}>
        <p className={styles.cantShow}>Not enough measurements to complete triangle.</p>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={300} height={300} viewBox='0 0 100 100'
          className={styles.svg}
        />
      </div>
    )
  }
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
  const aRt = abs(triangle.ac.angle - triangle.ab.angle - rt) < 0.000001
  const bRt = abs(triangle.ba.angle - triangle.bc.angle - rt) < 0.000001
  const cRt = abs(triangle.cb.angle - triangle.ca.angle - rt) < 0.000001
  const arcA = <circle className={styles.arc} cx={ax} cy={ay} r={fontSize * 0.7} clipPath='url(#triangleClip)' />
  const arcB = <circle className={styles.arc} cx={bx} cy={by} r={fontSize * 0.7} clipPath='url(#triangleClip)' />
  const arcC = <circle className={styles.arc} cx={cx} cy={cy} r={fontSize * 0.7} clipPath='url(#triangleClip)' />
  const sqA = <rect className={styles.arc} x={ax} y={ay} width={fontSize * 0.7} height={fontSize * 0.7} transform={`rotate(${triangle.ab.angle * 180 / PI - 90} ${ax} ${ay})`} />
  const sqB = <rect className={styles.arc} x={bx} y={by} width={fontSize * 0.7} height={fontSize * 0.7} transform={`rotate(${triangle.bc.angle * 180 / PI + 90} ${bx} ${by})`} />
  const sqC = <rect className={styles.arc} x={cx} y={cy} width={fontSize * 0.7} height={fontSize * 0.7} transform={`rotate(${-triangle.cb.angle * 180 / PI} ${cx} ${cy})`} />
  return (
    <div className={styles.container}>
      <p className={styles.cantShow} />
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={300} height={300} viewBox={svgViewbox}
        className={styles.svg}
      >
        <clipPath id='triangleClip'>
          <path d={`M ${ax},${ay} L ${bx},${by} L ${cx},${cy} Z`} />
        </clipPath>
        {aRt ? sqA : arcA}
        {bRt ? sqB : arcB}
        {cRt ? sqC : arcC}
        <path
          d={`M ${ax},${ay} L ${bx},${by} L ${cx},${cy} Z`}
          className={styles.trianglePath}
        />
        <text className={classnames(styles.label, styles.side)} fontSize={fontSize * 0.8} x={lax} y={lay} dy={dy}>{`${labels.B}${labels.C}`}</text>
        <text className={classnames(styles.label, styles.side)} fontSize={fontSize * 0.8} x={lbx} y={lby} dy={dy}>{`${labels.A}${labels.C}`}</text>
        <text className={classnames(styles.label, styles.side)} fontSize={fontSize * 0.8} x={lcx} y={lcy} dy={dy}>{`${labels.A}${labels.B}`}</text>

        <text className={styles.label} fontSize={fontSize} x={lAx} y={lAy} dy={dy}>{labels.A}</text>
        <text className={styles.label} fontSize={fontSize} x={lBx} y={lBy} dy={dy}>{labels.B}</text>
        <text className={styles.label} fontSize={fontSize} x={lCx} y={lCy} dy={dy}>{labels.C}</text>
      </svg>
    </div>
  )
}

function mapStateToProps (state) {
  if (!getErrors(state) && canInferAll(state)) {
    return {
      triangle: Triangle.FromMetrics(state),
      labels: state.labels
    }
  } else {
    return {}
  }
}

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(TriangleDrawing)
