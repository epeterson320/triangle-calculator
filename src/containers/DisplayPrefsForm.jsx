import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Checkbox from '../components/Checkbox'
import * as action from '../modules/display'
import styles from './DisplayPrefsForm.scss'

export class DisplayPrefsForm extends PureComponent {
  render () {
    const { showCC, showIC, showOC, showCentroid, showEuler, dispatch } = this.props
    const actions = bindActionCreators(action, dispatch)

    return (<form className={styles.container}>
      <h3 className={styles.header}>Show Triangle Features</h3>
      <Checkbox
        label='Circumcenter'
        onChange={actions.showCCenter}
        checked={showCC} />
      <Checkbox
        label='Incenter'
        onChange={actions.showICenter}
        checked={showIC} />
      <Checkbox
        label='Orthocenter'
        onChange={actions.showOCenter}
        checked={showOC} />
      <Checkbox
        label='Centroid'
        onChange={actions.showCentroid}
        checked={showCentroid} />
      <Checkbox
        label='Euler Line'
        onChange={actions.showEuler}
        checked={showEuler} />
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

export default connect(mapStateToProps)(DisplayPrefsForm)
