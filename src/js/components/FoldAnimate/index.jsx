import React, { useState, useEffect, useMemo } from 'react';
import cn from 'classnames';
import styles from './index.module.scss';

/**
 * @param className
 * @param start Boolean
 * @param delay Number 动画延迟开始, 单位ms
 * @param splitNum Number 分割小块的数量
 * @param during Number 动画时长 单位秒
 * @param animateDirection 动画翻转方向
 * @param itemDirection 栅格排列
 */
const FoldAnimate = ({
  className,
  bgImg,
  start = false,
  delay = 0,
  splitNum = 1,
  animateDirection = 'left',
  itemDirection = 'row',
  during = 0.5,
}) => {
  const [hide, setHide] = useState(false);
  const [myStart, setMyStart] = useState(false);
  const transformOrigin = useMemo(() => {
    switch (animateDirection) {
      case 'left':
        return 'left center';
      case 'right':
        return 'right center';
      case 'top':
        return 'center top';
      case 'bottom':
        return 'center bottom';
      default:
    }
  }, [animateDirection]);

  useEffect(() => {
    if (start) {
      setTimeout(() => setHide(true), during * 1000 + delay);
      setTimeout(() => setMyStart(true), delay);
    }
  }, [start, during, delay]);

  return (
    <div
      className={cn(
        className,
        styles.box,
        { [styles.hide]: hide },
        { [styles.column]: itemDirection === 'column' }
      )}
    >
      {new Array(splitNum).fill().map((i, k) => (
        <div
          key={k}
          className={styles.item}
          style={{
            '--index': k,
            transition: `${during}s`,
            backgroundImage: `url(${bgImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundPositionX:
              itemDirection === 'row'
                ? `calc(var(--index) * ${100 / splitNum}%)`
                : 'top',
            backgroundPositionY:
              itemDirection === 'row'
                ? 'top'
                : `calc(var(--index) * ${100 / splitNum}%)`,
            transformOrigin,
            backgroundSize: 'cover',
            transform: myStart
              ? itemDirection === 'row'
                ? 'rotateY(90deg)'
                : 'rotateX(90deg)'
              : 'none',
          }}
        />
      ))}
    </div>
  );
};

export default FoldAnimate;
