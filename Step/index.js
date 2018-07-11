import React, {PureComponent} from 'react';
import styles from './index.less';
export default class Step extends PureComponent {
  render() {
    const {data, step} = this.props;
    return (
      <div onClick={this.onClick} className={styles.normal}>
        {data.map((item, i) => {
          return (
            <div key={i} className={i <= step ? styles.active : ''}>
              <div className={styles.step}>
                {i != 0 ? <span className={styles.line} /> : null}

                <div className={styles.info}>
                  <div className={styles.mask + ' step_mask'} data-index={i} />
                  <span className={styles.num + ' ' + (i <= step ? styles.num_active : '')}>{i + 1}</span>
                  <span className={styles.name}>{item.name}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  onClick = e => {
    const target = e.target;
    if (target.nodeName === 'DIV' && target.className.indexOf('step_mask') !== -1) {
      const index = target.getAttribute('data-index') - 0;
      this.setState({index}, () => {
        this.props.onStep && this.props.onStep(index);
      });
    }
  };
}
