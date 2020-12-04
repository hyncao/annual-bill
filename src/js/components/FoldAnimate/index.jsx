import React, { useState, useEffect, useMemo } from 'react';
import cn from 'classnames';
import { useSpring, animated } from 'react-spring';
import styles from './index.module.scss';

/**
 * @param className
 * @param start Boolean
 * @param splitNum Number 分割小块的数量
 * @param during Number 动画时长 单位秒
 */
const FoldAnimate = ({
  className,
  bgImg,
  start = false,
  splitNum = 1,
  direction = 'left',
  during = 0.5,
}) => {
  const [hide, setHide] = useState(false);
  const transformOrigin = useMemo(() => {
    switch (direction) {
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
  }, [direction]);

  useEffect(() => {
    if (start) {
      setTimeout(() => setHide(true), during * 1000);
    }
  }, [start, during]);

  return (
    <div className={cn(className, styles.box, { [styles.hide]: hide })}>
      {new Array(splitNum).fill().map((i, k) => (
        <div
          key={k}
          className={cn(styles.item, { [styles.start]: start })}
          style={{
            transition: `${during}s`,
            background: `url(${bgImg}) top center no-repeat`,
            backgroundPositionX: `calc(var(--index) * ${100 / splitNum}%)`,
            transformOrigin,
            backgroundSize: 'cover',
            transform: start ? 'rotateY(90deg)' : 'none',
          }}
        />
      ))}
    </div>
  );
};

export default FoldAnimate;
