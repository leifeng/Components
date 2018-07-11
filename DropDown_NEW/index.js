import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import styles from './index.less';

export default class DropDown extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.has = false;
  }
  componentWillReceiveProps(nextProps) {
    const {items} = nextProps;
    if (items.length > 0) {
      this.calculatePosition();
      ReactDOM.render(this.DropDownContent(items), this.div);
    }
  }
  render() {
    const {visible} = this.state;
    const {name, items = []} = this.props;
    return (
      <div className={styles.normal} style={{display: items.length === 0 ? 'none' : 'inline-block'}}>
        {name}
        <i className={`icon icon-drop_down icon-margin-left ${visible ? 'icon-rotate' : ''}`} />
        <span className={styles.layer} ref={span => (this.span = span)} />
      </div>
    );
  }
  onSelect = e => {
    const target = e.target;
    if (target.nodeName === 'LI') {
      const disabled = target.getAttribute('data-disabled');
      if (disabled === 'true') return;
      const {onSelect} = this.props;
      const name = target.getAttribute('data-name'),
        value = target.getAttribute('data-value'),
        key = target.getAttribute('data-key');
      this.setState({visible: false}, () => {
        onSelect(key, name);
      });
    }
  };
  DropDownContent = items => {
    return (
      <ul
        ref={ul => (this.ul = ul)}
        className={styles.list}
        style={{display: this.state.visible ? 'block' : 'none'}}
        onClick={this.onSelect}>
        {items.map((item, index) => {
          return (
            <li
              key={index}
              data-name={item.name}
              data-value={item.value}
              data-key={item.key}
              data-disabled={item.disabled}
              className={`${item.disabled ? styles.disabled : ''} ${
                item.name.indexOf('删除') !== -1 ? styles.delete : ''
              }`}>
              {item.name}
            </li>
          );
        })}
      </ul>
    );
  };
  calculatePosition = () => {
    const DOMRect = this.span.parentNode.getBoundingClientRect(),
      left = DOMRect.left,
      top = DOMRect.bottom,
      width = DOMRect.width;
    this.div.style.cssText = `min-width: ${width}px; position: absolute; top: ${top +
      3}px; left: ${left}px; z-index: 99;`;
  };
  componentDidMount() {
    const body = document.body,
      _this = this,
      {items} = this.props;
    this.div = document.createElement('div');
    ReactDOM.render(this.DropDownContent(items), this.div);
    this.span.onclick = e => {
      _this.calculatePosition();
      const {visible} = _this.state;
      if (_this.has === false) {
        body.appendChild(_this.div);
        _this.has = true;
      }
      const ul = ReactDOM.findDOMNode(_this.ul);
      _this.setState(
        {
          visible: !visible
        },
        () => {
          const {visible} = _this.state;
          _this.ul.style.display = visible ? '' : 'none';
          if (visible) {
            window.onclick = e => {
              if (e.target !== _this.span) {
                _this.setState(
                  {
                    visible: false
                  },
                  () => {
                    const {visible} = _this.state;
                    _this.ul.style.display = visible ? '' : 'none';
                  }
                );
              }
            };
          } else {
            window.onclick = null;
          }
        }
      );
    };
    window.onresize = () => {
      _this.calculatePosition();
    };
  }
  componentWillUnmount() {
    const body = document.body;
    if (this.div && this.has) {
      body.removeChild(this.div);
    }
    window.onresize = null;
    window.onclick = null;
    this.span.onclick = null;
  }
}
