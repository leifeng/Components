import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import styles from './index.less';

const bodyDom = document.body;

const MessageWrap = () => {
  return (
    <div id="message-warp" className={styles.message_warp}>
      <span />
    </div>
  );
};

let spanDom = '';
const delayDelete = (dom, delay) => {
  setTimeout(() => {
    dom.setAttribute('class', 'animated slideOutUp');
    setTimeout(() => {
      const arr = [...spanDom.childNodes];
      if (arr.findIndex(v => v === dom) === -1) return;
      spanDom.removeChild(dom);
    }, 500);
  }, delay);
};

const basicFun = ({type, content = '"content"为展示信息的key', color, delay = 1500}) => {
  if (!spanDom) {
    const dom = document.createElement('div');
    bodyDom.appendChild(dom);
    ReactDOM.render(<MessageWrap />, dom);
    const wrapDom = document.getElementById('message-warp');
    spanDom = wrapDom.children[0];
  }
  const messageDom = document.createElement('div'),
    messageDomWarp = document.createElement('div');
  messageDomWarp.appendChild(messageDom);
  messageDomWarp.setAttribute('class', `animated slideInDown`);
  messageDom.setAttribute('class', `message-content`);
  messageDom.style.color = color;
  spanDom.appendChild(messageDomWarp);
  if (type === 'error') {
    ReactDOM.render(<div className={styles.message_content}>{content}</div>, messageDom);
    // const iconDom = document.createElement('i');
    // iconDom.setAttribute('class', 'fas fa-trash-alt fa-lg');
    // messageDom.appendChild(iconDom);
    // iconDom.onclick = () => {
    //   delayDelete(messageDomWarp, 0);
    //   iconDom.onclick = null;
    // };
    delayDelete(messageDomWarp, 3000);
  } else {
    ReactDOM.render(content, messageDom);
    delayDelete(messageDomWarp, delay);
  }
};

const message = {
  success: params => {
    basicFun({type: 'success', color: '#33cc00', ...params});
  },
  warning: params => {
    basicFun({type: 'warning', color: '#F6A623', ...params});
  },
  error: params => {
    basicFun({type: 'error', color: '#F14742', ...params});
  }
};

export default message;
