import React, { Component } from 'react'
import { connect } from 'react-redux'
import Checkbox from '../components/Checkbox'
import * as app from '../modules/app'
import styles from './DisplayPrefsForm.scss'

export class DisplayPrefsForm extends Component {
  render () {
    return (<form className={styles.container}>
      <h3>Show Triangle Features</h3>
      <Checkbox
        label='Circumcenter'
        onChange={this.props.showCC}
        checked={this.props.isShowingCC} />
      <Checkbox
        label='Incenter'
        onChange={this.props.showIC}
        checked={this.props.isShowingIC} />
      <Checkbox
        label='Orthocenter'
        onChange={this.props.showOC}
        checked={this.props.isShowingOC} />
      <Checkbox
        label='Centroid'
        onChange={this.props.showCentroid}
        checked={this.props.isShowingCentroid} />
    </form>)
  }
}

const mapStateToProps = state => ({
  isShowingCC: state.showCCenter,
  isShowingIC: state.showICenter,
  isShowingOC: state.showOCenter,
  isShowingCentroid: state.showCentroid
})

const mapDispatchToProps = dispatch => ({
  showCC (show) { dispatch(app.showCCenter(show)) },
  showIC (show) { dispatch(app.showICenter(show)) },
  showOC (show) { dispatch(app.showOCenter(show)) },
  showCentroid (show) { dispatch(app.showCentroid(show)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPrefsForm)
