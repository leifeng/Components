import React, {PureComponent} from 'react';
import Icon from 'antd/lib/icon';
import Tooltip from 'antd/lib/tooltip';
import styles from './index.less';
export default class FormItem extends PureComponent {
  render() {
    const {
      name,
      tip,
      bottom = 28,
      labelWidth = 100,
      children,
      verify = true,
      message,
      errorMessage,
      isRequire
    } = this.props;
    return (
      <div className={styles.normal} style={{marginBottom: bottom}}>
        <div className={styles.clear}>
          <label className={isRequire ? styles.label : ''} style={{width: labelWidth}}>
            {name}
            {tip ? (
              <Tooltip
                title={tip}
                arrowPointAtCenter={true}
                getPopupContainer={triggerNode => triggerNode.parentNode.parentNode}>
                <Icon style={{marginLeft: '5px', position: 'absolute', top: 6}} type="question-circle-o" />
              </Tooltip>
            ) : null}
          </label>
          <div className={styles.formitem} style={{marginLeft: labelWidth}}>
            {children}
          </div>
        </div>
        <div className={styles.message} style={{marginLeft: labelWidth}}>
          {verify ? (
            <span className={styles.desc}>{message}</span>
          ) : (
            <span className={styles.error}>{errorMessage}</span>
          )}
        </div>
      </div>
    );
  }
}
