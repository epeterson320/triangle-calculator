import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './RadioList.module.css';

class RadioList extends PureComponent {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.state = { selected: props.opts.find(opt => opt.default).value };
  }

  onChange(value) {
    this.setState({ selected: value });
    this.props.onChange(value);
  }

  render() {
    return (
      <div className={styles.container}>
        {this.props.opts.map(option => [
          <label
            className={styles.label}
            htmlFor={option.label}
            key={`l${option.label}`}
          >
            {option.label}
          </label>,
          <input
            id={option.label}
            key={option.label}
            type="radio"
            name="name"
            className={styles.input}
            checked={option.value === this.state.selected}
            onChange={() => this.onChange(option.value)}
          />,
        ])}
      </div>
    );
  }
}

RadioList.propTypes = {
  opts: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any,
      default: PropTypes.bool,
    }),
  ).isRequired,
  onChange: PropTypes.func,
};

RadioList.defaultProps = {
  onChange: () => {},
};

export default RadioList;
