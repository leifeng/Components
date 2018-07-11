import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import styles from './index.less';
import tipStore from '../../routes/tipStore';
import Icon from 'antd/lib/icon';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';

@observer
export default class Tip extends Component {
  render() {
    const list = tipStore.list;
    return null;
  }
  componentDidMount() {
    this.tip = document.createElement('div');
    document.body.appendChild(this.tip);
    this.render_Tip();
  }
  componentDidUpdate() {
    this.render_Tip();
  }
  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.tip);
    document.body.removeChild(this.tip);
  }
  onClick = e => {
    const target = e.target;
    if (target.nodeName === 'A') {
      const id = target.getAttribute('data-id');
      tipStore.hideList(id);
    }
  };
  render_Tip = () => {
    const list = toJS(tipStore.list);

    ReactDOM.render(
      <div className={styles.normal} onClick={this.onClick}>
        {list.map(item => {
          let bg = '';
          let type = '';
          let color = '';
          switch (item.iconType) {
            case 'start':
              bg = 'start_bg';
              type = 'exclamation-circle';
              color = '#2a78b0';
              break;
            case 'success':
              bg = 'success_bg';
              type = 'check-circle';
              color = '#64c407';
              break;
            case 'error':
              bg = 'error_bg';
              type = 'close-circle';
              color = '#fe2d32';
              break;
            case 'warning':
              bg = 'warning_bg';
              type = 'exclamation-circle';
              color = '#efb336';
              break;
          }
          return (
            <div
              key={item.id}
              className={
                styles.item +
                ' ' +
                styles[bg] +
                ' ' +
                'animated' +
                ' ' +
                (item.visible ? 'fadeInRight' : 'fadeOutRight')
              }>
              <Icon type={type} style={{color, marginRight: 5}} />
              {item.action}
              {item.name ? '：' + item.name : null}
              {item.message || null}
              <a data-id={item.id} className={styles.close}>
                x
              </a>
            </div>
          );
        })}
      </div>,
      this.tip
    );
  };
}
