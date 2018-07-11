import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import styles from './index.less';
import Button from '../Button_NEW';
function _confirm(props) {
  const {title, message, onClose, onOk, icon} = props;
  let div = document.getElementById('confirm');
  if (!div) {
    div = document.createElement('div');
    div.id = 'confirm';
    document.body.appendChild(div);
  }
  ReactDOM.render(
    <div className={styles.normal}>
      <div className={styles.mask} onClick={close} />
      <div className={`${styles.content} animated fadeIn`}>
        <div className={styles.modal}>
          <div className={styles.header}>{title}</div>
          <div className={styles.body}>
            <div className={styles.message}>
              <span className="icon-notice" style={{color: icon === 'delete' ? '#fe2d32' : '#efb336'}} />
              {message}
            </div>
            <div className={styles.actions}>
              {onClose ? <Button name="取消" type={'cancel'} onClick={close} /> : null}
              <Button name="确定" onClick={ok} />
            </div>
          </div>
        </div>
      </div>
    </div>,
    div
  );
  function ok() {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    onOk && onOk();
  }
  function close() {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    onClose && onClose();
  }
}
export default class Confirm extends PureComponent {
  divRender() {
    const {title, message, visible, onClose, onOk, icon} = this.props;
    ReactDOM.render(
      <div className={styles.normal} style={{display: visible ? 'block' : 'none'}}>
        <div className={styles.mask} />
        <div className={`${styles.content} animated fadeIn`}>
          <div className={styles.modal}>
            <div className={styles.header}>{title}</div>
            <div className={styles.body}>
              <div className={styles.message}>
                <span className="icon-notice" style={{color: icon === 'delete' ? '#fe2d32' : '#efb336'}} />
                {message}
              </div>
              <div className={styles.actions}>
                <Button name="取消" type="cancel" onClick={onClose} />
                <Button name="确定" onClick={onOk} />
              </div>
            </div>
          </div>
        </div>
      </div>,
      this.popup
    );
  }
  render() {
    return null;
  }
  componentDidUpdate() {
    this.divRender();
  }
  componentDidMount() {
    this.popup = document.getElementById('confirm');
    if (!this.popup) {
      this.popup = document.createElement('div');
      this.popup.id = 'confirm';
      document.body.appendChild(this.popup);
    }
    this.divRender();
  }

  componentWillUnmount() {
    const unmountResult = ReactDOM.unmountComponentAtNode(this.popup);
    if (unmountResult && this.popup.parentNode) {
      this.popup.parentNode.removeChild(this.popup);
    }
  }
}

Confirm.delete = args => _confirm({...args, icon: 'delete'});
Confirm.warning = args => _confirm({...args, icon: 'warning'});
