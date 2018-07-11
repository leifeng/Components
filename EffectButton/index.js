import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

export default class EffectButton extends Component {
  static defaultProps = {
    handleClick: null,
    color: 'rgba(255,255,255,.1)'
  };
  state = {
    animate: false
  };
  static propTypes = {
    handleClick: PropTypes.func
  };
  t = -1;
  render() {
    const {children, handleClick, disabled, buttonEffect = true, ...otherProps} = this.props;
    const {animate} = this.state;
    return (
      <a
        className={styles.normal}
        {...otherProps}
        ref={a => {
          this.a = a;
        }}>
        {children}
        {!disabled ? (
          buttonEffect ? (
            <span
              className={styles.effect + ' ' + (animate ? styles.animate : '')}
              ref={span => {
                this.span = span;
              }}
            />
          ) : null
        ) : null}
      </a>
    );
  }
  componentDidMount() {
    this.a.onclick = e => {
      const {handleClick, color} = this.props;
      handleClick && handleClick();
      this.setState({animate: true});
      const button = e.target;
      const effect = this.span;
      if (effect) {
        let d = Math.max(button.offsetHeight, button.offsetWidth);
        let x = e.layerX - effect.offsetWidth / 2;
        let y = e.layerY - effect.offsetHeight / 2;
        effect.setAttribute('style', `height: ${d}px; width:${d}px;top:${y}px;left:${x}px; background: ${color}`);
      }
      this.t = setTimeout(() => {
        clearTimeout(this.t);
        this.setState({animate: false});
      }, 500);
    };
  }

  componentWillUnmount() {
    this.a.onclick = null;
    clearTimeout(this.t);
  }
}
