import React, {PureComponent} from 'react';
import styles from './index.less';

export default class Input extends PureComponent {
  render() {
    const {type = 'text', value, placeholder, width = 300, verify = true, onSearch, id, ...other} = this.props;
    return (
      <div className={styles.normal}>
        <div className={styles.panel} style={{borderColor: verify ? '#bcc0c9' : '#FE2D32'}}>
          <input
            {...other}
            id={id}
            style={{width: width}}
            type={type}
            value={value}
            onChange={this.onChange}
            placeholder={placeholder}
          />
          {onSearch ? <i className={`icon icon-search ${styles['icon-search']}`} /> : null}
        </div>
      </div>
    );
  }
  onChange = e => {
    this.props.onChange(e.target.value);
  };
}
