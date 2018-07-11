import React, {PureComponent} from 'react';
import styles from './index.less';
export default class TextArea extends PureComponent {
  render() {
    const {value} = this.props;
    return (
      <div className={styles.normal}>
        <textarea value={value} onChange={this.onChange} />
      </div>
    );
  }
  onChange = e => {
    const {onChange} = this.props;
    onChange && onChange(e.target.value);
  };
}
