import React, {PureComponent} from 'react';
import styles from './index.less';
export default class CheckButton extends PureComponent {
  render() {
    const {data, value} = this.props;
    return (
      <div className={styles.normal} onClick={this.onClick}>
        {data.map((item, index) => {
          return (
            <span key={index} data-value={item.value} className={value == item.value ? styles.active : ''}>
              {item.name}
            </span>
          );
        })}
      </div>
    );
  }
  onClick = e => {
    const target = e.target;
    if (target.nodeName === 'SPAN') {
      const {onCheck} = this.props;
      const value = target.getAttribute('data-value');
      const name = target.innerText;
      onCheck && onCheck(value, name);
    }
  };
}
