import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import styles from './index.less';

export default class Modal extends PureComponent {
  state = {
    height: 'auto'
  };
  divRender() {
    const {height} = this.state;
    const {title, subtitle = null, visible, children, onClose} = this.props;
    ReactDOM.render(
      <div className={styles.normal} style={{display: visible ? 'block' : 'none'}}>
        <div className={styles.mask} />
        <div className={`${styles.content} animated fadeIn`}>
          <div className={styles.modal}>
            <div className={styles.header}>
              {title} <span className={styles.subtitle}>{subtitle}</span>
              <a onClick={onClose}>
                <i className="icon-close" />
              </a>
            </div>
            <div className={styles.body}>
              <div style={{height: height}} id="modalContent">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>,
      this.modal
    );
  }
  getHeight = () => {
    const modalContent = document.getElementById('modalContent');
    if (!modalContent) return;
    const offsetHeight = document.body.offsetHeight || document.documentElement.offsetHeight;
    const content = modalContent.children[0];
    if (content) {
      const contentBody = content.children[0];
      const contentBodyHeight = contentBody.offsetHeight;
      if (offsetHeight <= 768) {
        contentBody.style.cssText =
          'min-height:90px;max-height:400px;overflow-x: hidden;overflow-y: auto;padding: 2px;';
      } else if (offsetHeight <= 1080) {
        contentBody.style.cssText =
          'min-height:90px;max-height:700px;overflow-x: hidden;overflow-y: auto;padding: 2px;';
      }
    }
  };
  render() {
    return null;
  }

  componentDidUpdate() {
    this.divRender();
  }
  componentDidMount() {
    this.modal = document.getElementById('modal');
    if (!this.modal) {
      this.modal = document.createElement('div');
      this.modal.id = 'modal';
      document.body.appendChild(this.modal);
    }
    this.divRender();
    setTimeout(() => {
      this.getHeight();
    }, 100);
    window.onresize = () => {
      if (!this.props.visible) return;
      this.getHeight();
    };
  }

  componentWillUnmount() {
    const unmountResult = ReactDOM.unmountComponentAtNode(this.modal);
    if (unmountResult && this.modal.parentNode) {
      this.modal.parentNode.removeChild(this.modal);
    }
  }
}
