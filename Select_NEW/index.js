import React, {PureComponent} from 'react';
import styles from './index.less';
import Popover from 'antd/lib/popover';
class Select extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  render() {
    const {visible} = this.state;
    const {width = 140, list, value, noAll = false, noSelectText = '查看所有'} = this.props;
    const items = list.filter(item => item.value == value);
    return (
      <span className={styles.normal}>
        <div className={styles.mask} style={{display: visible ? 'block' : 'none'}} onClick={this.onVisible} />
        <span className={styles.main} style={{width: width}}>
          &nbsp;
          <Popover
            placement="bottomLeft"
            visible={visible}
            autoAdjustOverflow={true}
            getPopupContainer={triggerNode => triggerNode.parentNode.parentNode}
            content={
              <ul className={styles.list} style={{width}} onClick={this.onSelect}>
                {!noAll && list.length !== 0 ? (
                  <li key={'null'}>
                    <a data-value={'null'}>{noSelectText}</a>
                  </li>
                ) : null}
                {list.map((item, index) => {
                  return (
                    <li key={index}>
                      <a data-value={item.value}>{item.name}</a>
                    </li>
                  );
                })}
              </ul>
            }>
            <a className={styles.text} onClick={this.onClick}>
              {list.length === 0 ? '暂无数据' : items.length > 0 ? items[0].name : noSelectText}
              <i className="icon-drop_down" style={{transform: visible ? 'rotate(180deg)' : 'rotate(0)'}} />
            </a>
          </Popover>
        </span>
      </span>
    );
  }
  onVisible = e => {
    this.setState({visible: false});
  };
  onClick = e => {
    this.setState({visible: !this.state.visible});
  };
  onSelect = e => {
    const target = e.target;
    if (target.nodeName === 'A') {
      const {onSelect} = this.props;
      const value = target.getAttribute('data-value');
      const name = target.innerText;
      this.setState({visible: false});
      onSelect && onSelect(value, name);
    }
  };
  componentDidMount() {}
}

export default Select;
