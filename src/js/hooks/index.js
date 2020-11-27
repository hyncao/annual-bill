import { useSpring, animated } from 'react-spring';

// 用px为单位的transform属性
const unitPxList = ['translate', 'perspective'];

// 用deg为单位的transform属性
const unitDegList = ['skew', 'rotate'];

/**
 * 生成有波动效果的动画, 即动画执行到制定结尾时, 进行小幅度回弹两次
 * @param {*} start Boolean 控制动画是否开始
 * @param {*} transformDeclare Array 控制动画类型以及变化趋势
 *
 * ===== 强约束参数格式 =====
 * [String, Number, Number]
 * [transformType, from, to]
 * e.g: ['translateX', 0, -400]
 *
 * @param delay Number 控制动画延迟时间, 单位ms
 * @param config Object https://www.react-spring.io/docs/hooks/api
 * @param otherAnimate Object { String: Function } 其他需要参与的动画
 * Function 必须 return String;
 * e.g: { width: x => `${x * 20}px`, transform: x => `rotate(${x * 180}deg)` }
 * @return Array [style, animated]
 */
export const useSpringWave = ({
  start = false,
  delay = 0,
  config = { tension: 250, friction: 100 },
  transformDeclare = [],
  otherAnimate = {},
}) => {
  if (!Array.isArray(transformDeclare)) {
    console.error(
      `useSpringWave 方法 transformDeclare 参数类型有误: ${transformDeclare}`
    );
  }
  const { x } = useSpring({
    delay,
    from: { x: 0 },
    to: { x: start ? 1 : 0 },
    config,
  });

  let otherAnimateCludeTransform = '';
  const otherAnimateStyle = {};
  Object.keys(otherAnimate).forEach((key) => {
    if (typeof otherAnimate[key] === 'function') {
      const result = otherAnimate[key](x);
      if (key === 'transform') {
        // 将 otherAnimate 参数中的 transform 分离
        otherAnimateCludeTransform = result;
      } else {
        otherAnimateStyle[key] = result;
      }
    } else {
      console.error(
        `useSpringWave 方法 otherAnimate 参数类型有误: ${otherAnimateStyle[key]}: typeof otherAnimate[key]`
      );
    }
  });

  const [transformType, from, to] = transformDeclare;
  const delta = Math.abs(to - from); // 变化幅度, 0 -> 100 幅度为100
  const symbol = to - from > 0; // 变化方向, true 递增, false 递减
  let unit = '';
  unitPxList.forEach((i) => {
    if (transformType.startsWith(i)) {
      unit = 'px';
    }
  });
  unitDegList.forEach((i) => {
    if (transformType.startsWith(i)) {
      unit = 'deg';
    }
  });

  // 配置动画实现
  const range = [0, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
  const output = [
    from,
    to,
    to + (symbol ? delta / 50 : -delta / 50),
    to,
    to - (symbol ? delta / 60 : -delta / 60),
    to + (symbol ? delta / 60 : -delta / 70),
    to,
  ];

  const styleProps = {
    ...otherAnimateStyle,
    transform: x
      .interpolate({
        range,
        output,
      })
      .interpolate(
        (x) => `${otherAnimateCludeTransform} ${transformType}(${x}${unit})`
      ),
  };
  return [styleProps, animated];
};
