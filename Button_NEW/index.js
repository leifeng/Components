import React, {PureComponent} from 'react';
import styles from './index.less';
import throttle from 'lodash/throttle';
export default class Button extends PureComponent {
  render() {
    const {name, icon, type = 'default', className, id = 'button', small, ...other} = this.props;

    return (
      <div
        {...other}
        id={id}
        style={{padding: small ? '0 15px' : '0 20px'}}
        className={`${styles.button} ${styles[type]} ${className}`}
        onClick={this.onClick}>
        {icon ? <span className={styles.icon + ' ' + icon} /> : null}
        {name}
      </div>
    );
  }
  onClick = throttle((...args) => {
    const {onClick, type} = this.props;
    if (type !== 'disabled') {
      onClick && onClick(...args);
    }
  }, 300);
}
