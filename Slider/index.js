import React, {PureComponent} from 'react';
import styles from './index.less';
import Tooltip from 'antd/lib/tooltip';

export default class Slider extends PureComponent {
  static defaultProps = {
    max: 30,
    min: 1,
    divide: 4,
    width: 250,
    id: ''
  };
  constructor(props) {
    super(props);
    const {min, max, width, defaultValue} = props,
      leftLimit = width / max,
      ratio = defaultValue || min;
    this.state = {
      x: leftLimit * ratio - 11,
      leftLimit,
      value: ratio,
      visible: false,
      cover: false,
      down: false,
      focus: false
    };
    this.layerX = leftLimit * min;
  }

  componentWillReceiveProps(nextProps) {
    const {min, max, width, defaultValue} = nextProps;
    if (defaultValue !== this.props.defaultValue) {
      this.setState({
        value: defaultValue,
        x: width / max * defaultValue - 11
      });
    }
    if (min !== this.props.min) {
      this.setState({
        value: min,
        x: width / max * min - 11
      });
    }
  }

  onChange = e => {
    const {width, max, min, disabled} = this.props;
    if (disabled) return;
    const {leftLimit} = this.state;
    let {value} = e.target;
    const compare = /^\d*$/,
      compare1 = /^0+/;
    if (!compare.test(value)) return;
    if (compare1.test(value)) {
      value = value.toString();
      value.substring(1, value.length);
      value = parseInt(value);
    }
    if (value > max) value = max;
    this.setState({
      x: value > min ? parseInt(value / max * width) - 11 : leftLimit * min - 11,
      value
    });
    e.target.value = value;
  };
  onFocus = e => {
    this.setState({
      focus: true
    });
  };
  onBlur = e => {
    const {width, max, min} = this.props;
    const {leftLimit} = this.state;
    const {value} = e.target;
    const num = value < min ? min : value;
    this.setState({
      x: leftLimit * num - 11,
      focus: false,
      value: num
    });
  };

  mouseUp = e => {
    if (this.props.disabled) return;
    document.onmousemove = null;
    const {value, cover} = this.state;
    const {event} = this.props;
    if (event) event(value);
    this.setState({
      down: false
    });
    if (!cover) {
      this.setState({
        visible: false
      });
    }
    this.circledown = false;
  };

  render() {
    const {width, divide, min, max, desc, unit, disabled, id} = this.props;
    const {x, value, visible, focus} = this.state;
    let arr = [],
      num = parseInt(max / divide),
      percent = (1 / divide * 100).toFixed(0) + '%';
    for (let i = 1; i <= divide; i++) {
      arr.push(
        <div key={i} className={`${styles.part}`} style={{width: percent}}>
          {i === divide ? '' : num * i}
        </div>
      );
    }
    return (
      <div ref={ref => (this.slider = ref)} className={styles.cover}>
        <div className={styles.cover_slider}>
          <div className={`${styles.slider} slider`} style={{width, flex: `0 0 ${width}px`}}>
            <div className={styles.block}>{arr}</div>
            <div className={`${styles.used} slider_used`} style={{width: x + 11, background: disabled ? '#ddd' : ''}} />
            <Tooltip title={value + ''} visible={visible} getPopupContainer={triggerNode => triggerNode.parentNode}>
              <i
                className={`${styles.circle} slider_circle`}
                style={{left: x, border: disabled ? '3px solid #ddd' : ''}}
              />
            </Tooltip>
          </div>
          <div className={styles.input}>
            <input
              id={'input-number-' + id}
              type="number"
              min={min}
              max={max}
              value={value}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              onChange={this.onChange}
            />
            <hr className={focus ? styles.scaleX : ''} />
          </div>
          {unit ? <span className={styles.unit}>{unit}</span> : null}
        </div>
        <span>{desc}</span>
      </div>
    );
  }
  componentDidMount() {
    const {max, width} = this.props;
    const dom = this.slider,
      div = dom.querySelector('.slider'),
      circle = dom.querySelector('.slider_circle');
    circle.onmouseover = e => {
      if (this.props.disabled) return;
      this.setState({
        visible: true,
        cover: true
      });
    };
    circle.onmouseout = e => {
      if (this.props.disabled) return;
      const {down} = this.state;
      this.setState({
        cover: false
      });
      if (!down) {
        this.setState({
          visible: false
        });
      }
    };
    circle.onmousedown = e => {
      if (this.props.disabled) return;
      this.circledown = true;
      this.layerX = e.target.offsetLeft + 11;
    };
    div.onmousedown = e => {
      if (this.props.disabled) return;
      const {leftLimit} = this.state;
      const {min} = this.props;
      this.x = e.pageX;
      this.setState({
        visible: true,
        down: true
      });
      if (!this.circledown) {
        this.layerX = e.layerX;
        let x = this.layerX;
        if (x >= width) x = width;
        if (x <= leftLimit * min) x = leftLimit * min;
        const num = parseInt(x / width * max) || min;
        this.setState({
          x: num * leftLimit - 11,
          value: num
        });
      }
      document.onmousemove = e => {
        const {leftLimit} = this.state;
        const {min} = this.props;
        let x = this.layerX + e.pageX - this.x;
        if (x >= width) x = width;
        if (x <= leftLimit * min) x = leftLimit * min;
        const num = parseInt(x / width * max) || min;
        this.setState({
          x: num * leftLimit - 11,
          value: num
        });
      };
    };
    document.addEventListener('mouseup', this.mouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.mouseUp);
  }
}

//用于计算距离html层的距离
function getOffsetLeft(dom, len) {
  if (dom.offsetParent) {
    len += dom.offsetLeft;
    return getOffsetLeft(dom.offsetParent, len);
  }
  return len;
}
