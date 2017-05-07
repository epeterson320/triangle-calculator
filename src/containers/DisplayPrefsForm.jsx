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
    </form>)
  }
}

const mapStateToProps = state => ({
  isShowingCC: state.showCCenter,
  isShowingIC: state.showICenter
})

const mapDispatchToProps = dispatch => ({
  showCC (show) { dispatch(app.showCCenter(show)) },
  showIC (show) { dispatch(app.showICenter(show)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPrefsForm)
