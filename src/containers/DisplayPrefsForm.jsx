import React, { Component } from 'react'
import { connect } from 'react-redux'
import Checkbox from '../components/Checkbox'
import { showCCenter } from '../modules/app'
import styles from './DisplayPrefsForm.scss'

export class DisplayPrefsForm extends Component {
  render () {
    return (<form className={styles.container}>
      <h3>Show Triangle Features</h3>
      <Checkbox
        label='Circumcenter'
        onChange={this.props.showCC}
        checked={this.props.isShowingCC} />
    </form>)
  }
}

const mapStateToProps = state => ({
  isShowingCC: state.showCCenter
})

const mapDispatchToProps = dispatch => ({
  showCC (show) { dispatch(showCCenter(show)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPrefsForm)
