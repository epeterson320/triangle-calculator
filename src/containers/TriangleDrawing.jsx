import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import LineSegment from '../geometry/LineSegment'
import Triangle from '../geometry/Triangle'
import styles from './TriangleDrawing.scss'
import solveTriangle from '../selectors/solveTriangle'

const { PI, abs, min } = Math
const rt = PI / 2

export class TriangleDrawing extends Component {
  render () {
    const { triangle, labels, showCC, showIC, showOC, showCentroid, showEuler } = this.props
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
    const U = triangle.circumcenter
    const ux = U.x - xl
    const uy = yt - U.y
    const ur = min(
      LineSegment.PointPoint(U, triangle.a).distance,
      LineSegment.PointPoint(U, triangle.b).distance
    )
    const I = triangle.incenter
    const ix = I.x - xl
    const iy = yt - I.y
    const ir = triangle.inradius

    const O = triangle.orthocenter
    const ox = O.x - xl
    const oy = yt - O.y

    const G = triangle.centroid
    const gx = G.x - xl
    const gy = yt - G.y

    const euler = triangle.eulerLine
    let e = { x1: 0, y1: 0, x2: 1, y2: 0 }
    if (euler) {
      const s = xr - xl
      const p1 = euler.point1.movePolar(euler.angle + PI, s)
      const p2 = euler.point2.movePolar(euler.angle, s)
      e = {
        x1: p1.x - xl,
        y1: yt - p1.y,
        x2: p2.x - xl,
        y2: yt - p2.y
      }
    }

    const aRt = abs(triangle.ac.angle - triangle.ab.angle - rt) < 0.00001
    const bRt = abs(triangle.ba.angle - triangle.bc.angle - rt) < 0.00001
    const cRt = abs(triangle.cb.angle - triangle.ca.angle - rt) < 0.00001
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
          <circle className={classnames(styles.circumcircle, { [styles.hidden]: !showCC })} cx={ux} cy={uy} r={ur} />
          <circle className={classnames(styles.circumcenter, { [styles.hidden]: !showCC })} cx={ux} cy={uy} r={fontSize * 0.1} />
          <circle className={classnames(styles.incircle, { [styles.hidden]: !showIC })} cx={ix} cy={iy} r={ir} />
          <circle className={classnames(styles.incenter, { [styles.hidden]: !showIC })} cx={ix} cy={iy} r={fontSize * 0.1} />
          <circle className={classnames(styles.orthocenter, { [styles.hidden]: !showOC })} cx={ox} cy={oy} r={fontSize * 0.1} />
          <circle className={classnames(styles.centroid, { [styles.hidden]: !showCentroid })} cx={gx} cy={gy} r={fontSize * 0.1} />
          {(euler != null)
            ? <line
              className={classnames(styles.euler, { [styles.hidden]: !showEuler })}
              x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
              />
            : null
          }
          <text
            className={classnames(
            styles.noEuler,
            { [styles.hidden]: euler != null || !showEuler }
            )}
            fontSize={fontSize * 0.5}
            x={xl + (xr - xl) * 0.3} y={yt + (yt - yb) * 0.2}
          >
            Euler line cannot be determined.
          </text>
        </svg>
      </div>
    )
  }
}

function mapStateToProps ({ input, display, labels }) {
  const solution = solveTriangle(input)
  if (solution.isSolved) {
    return {
      triangle: Triangle.FromMetrics(solution.computed),
      labels,
      showCC: display.cCenter,
      showIC: display.iCenter,
      showOC: display.oCenter,
      showCentroid: display.centroid,
      showEuler: display.euler
    }
  } else {
    return {}
  }
}

export default connect(mapStateToProps)(TriangleDrawing)
