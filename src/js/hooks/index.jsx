import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useSpring, animated } from 'react-spring';
import { Modal } from 'js/components';
import { MyCtx, rem2Px } from 'js/utils';
import { canvasShowImgSpeed } from 'config';

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
  config,
  transformDeclare = [],
  otherAnimate = {},
}) => {
  if (!Array.isArray(transformDeclare)) {
    console.error(
      `useSpringWave 方法 transformDeclare 参数类型有误: ${transformDeclare}`
    );
  }
  const fixConfig = { tension: 250, friction: 100, ...config };
  const { x } = useSpring({
    delay,
    from: { x: 0 },
    to: { x: start ? 1 : 0 },
    config: fixConfig,
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

/**
 * @param {*} children ReactElement 弹窗内容
 * @param {*} maskClick Boolean 点击阴影是否可以关闭弹窗
 * @return { show, hide } Object { Function } 用来操作生成的弹窗
 */
export const useModal = ({ children, maskClick, ...otherProps }) => {
  const [id, setId] = useState();
  const [handle, setHandle] = useState();
  const rootRef = useRef();
  rootRef.current = document.createElement('div');
  const hide = () => {
    ReactDOM.render(
      <Modal show={false} {...otherProps}>
        {children()}
      </Modal>,
      document.getElementById(`myModal${id}`)
    );
  };
  const show = () => {
    ReactDOM.render(
      <Modal
        show={true}
        maskClick={maskClick ? () => hide() : false}
        {...otherProps}
      >
        {children(hide)}
      </Modal>,
      document.getElementById(`myModal${id}`)
    );
  };
  useEffect(() => {
    if (id) {
      rootRef.current.id = `myModal${id}`;
      document.body.appendChild(rootRef.current);
      setHandle({
        show,
        hide,
      });
    } else {
      setId(Math.floor(Math.random() * 10000));
    }
  }, [id]);
  return handle;
};

/**
 * 用canvas画雷达图
 * @param {*} canvasRef Ref canvas元素的ref
 * @param {*} start Boolean 动画开始
 * @param {*} img File / Url 图片文件
 * @param width Number canvas的实际宽度 单位 px
 * @param speed Number 转圈的速度
 */
export const useRadar = ({
  canvasRef,
  start,
  width = 300,
  img,
  speed = canvasShowImgSpeed,
}) => {
  const imgRef = useRef();
  useEffect(() => {
    imgRef.current = new Image();
    imgRef.current.src = img;
    if (start) {
      const init = () => {
        const draw = (i = 0) => {
          // canvas距离左右边距, 单位rem
          const marginLeft = rem2Px(0.6);
          const canvasWidth =
            window.document.documentElement.clientWidth - marginLeft * 2;
          canvasRef.current.width = canvasWidth;
          canvasRef.current.height = canvasWidth;
          const ctx = canvasRef.current.getContext('2d');
          const myCtx = new MyCtx(ctx);
          myCtx
            .save()
            .beginPath()
            .moveTo(canvasWidth / 2, canvasWidth / 2)
            .arc(
              canvasWidth / 2,
              canvasWidth / 2,
              (canvasWidth / 2) * 1.5,
              Math.PI * 1.5,
              Math.PI * (1.5 + (i / 360) * speed)
            )
            .lineTo(canvasWidth / 2, canvasWidth / 2)
            .closePath()
            .clip()
            .drawImage(imgRef.current, 0, 0, canvasWidth, canvasWidth)
            .restore();
          if (i < 360) {
            setTimeout(() => {
              draw(i + 2);
            }, 10);
          }
        };
        draw();
      };
      imgRef.current.onload = init;
    }
  }, [start]);
};
