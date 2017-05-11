import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Checkbox from '../components/Checkbox'
import * as action from '../modules/display'
import styles from './DisplayPrefsForm.scss'

export class DisplayPrefsForm extends PureComponent {
  render () {
    return (<form className={styles.container}>
      <h3 className={styles.header}>Show Triangle Features</h3>
      <Checkbox
        label='Circumcenter'
        onChange={this.props.setCC}
        checked={this.props.showCC} />
      <Checkbox
        label='Incenter'
        onChange={this.props.setIC}
        checked={this.props.showIC} />
      <Checkbox
        label='Orthocenter'
        onChange={this.props.setOC}
        checked={this.props.showOC} />
      <Checkbox
        label='Centroid'
        onChange={this.props.setCentroid}
        checked={this.props.showCentroid} />
      <Checkbox
        label='Euler Line'
        onChange={this.props.setEuler}
        checked={this.props.showEuler} />
    </form>)
  }
}

const mapStateToProps = ({ display }) => ({
  showCC: display.cCenter,
  showIC: display.iCenter,
  showOC: display.oCenter,
  showCentroid: display.centroid,
  showEuler: display.euler
})

const mapDispatchToProps = dispatch => ({
  setCC (show) { dispatch(action.showCCenter(show)) },
  setIC (show) { dispatch(action.showICenter(show)) },
  setOC (show) { dispatch(action.showOCenter(show)) },
  setCentroid (show) { dispatch(action.showCentroid(show)) },
  setEuler (show) { dispatch(action.showEuler(show)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPrefsForm)
