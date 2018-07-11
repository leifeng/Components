import React, {PureComponent} from 'react';
import styles from './index.less';
export default class NumberInput extends PureComponent {
  state = {
    minusState: false,
    plusState: false
  };
  render() {
    const {value} = this.props;
    return (
      <span className={styles.normal} onClick={this.onClick}>
        <a className={styles.minus} disabled={this.state.minusState} data-type="-1">
          -
        </a>
        <input type="text" value={value} onChange={this.onChange} onBlur={this.onBlur} />
        <a className={styles.plus} disabled={this.state.plusState} data-type="1">
          +
        </a>
      </span>
    );
  }
  componentDidMount() {
    const {min = 0, max = 1000, value} = this.props;
    if (value <= min) {
      this.setState({
        minusState: true
      });
    } else {
      this.setState({
        minusState: false
      });
    }
    if (value >= max) {
      this.setState({
        plusState: true
      });
    } else {
      this.setState({
        plusState: false
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.props.value) {
      this.disabledState(nextProps.value);
    }
  }
  onClick = e => {
    const target = e.target;
    if (target.nodeName === 'A') {
      const type = target.getAttribute('data-type') - 0;
      const disabled = target.getAttribute('disabled');
      const value = parseFloat(this.props.value);
      this.disabledState(value + type);
    }
  };
  onChange = e => {
    const {min = 0, max = 1000, onChange} = this.props;
    const value = e.target.value;

    if (value < min) {
      this.setState({
        minusState: true
      });
    }
    if (value > max) {
      this.setState({
        plusState: true
      });
    }
    onChange && onChange(value);
  };
  onBlur = e => {
    const value = parseFloat(e.target.value);
    this.disabledState(value);
  };
  disabledState = value => {
    const {min = 0, max = 1000, onChange} = this.props;
    if (value <= min) {
      this.setState({
        minusState: true
      });
      onChange && onChange(min);
      return;
    } else {
      this.setState({
        minusState: false
      });
    }
    if (value >= max) {
      this.setState({
        plusState: true
      });
      onChange && onChange(max);
      return;
    } else {
      this.setState({
        plusState: false
      });
    }
    onChange && onChange(value);
  };
}
