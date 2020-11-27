import React, { useCallback, useEffect, useMemo } from 'react';
import cn from 'classnames';
import Paragraph from './Paragraph';
import styles from './index.module.scss';

/**
 * 文字动画组件
 * @param className 组件 className
 * @param transformType String transform动画类型
 * @param from Number
 * @param to Number
 * @param itemClassName 内部item className
 * @param delay Number 动画延迟启动
 * @param deltaDelay Number 每个children的间隔延迟
 * @param rotate Boolean 是否需要旋转效果
 * @param config Object 动画配置项
 * @param start Boolean 开始动画
 */

const TypographyAnimate = ({
  className,
  itemClassName,
  delay = 0,
  deltaDelay = 0,
  children,
  ...props
}) => {
  const arrayWrapChildren = Array.isArray(children) ? children : [children];

  return (
    <div className={cn(className, styles.content)}>
      {arrayWrapChildren.map((item, k) => (
        <Paragraph
          key={k}
          className={itemClassName}
          delay={delay + deltaDelay * k}
          {...props}
        >
          {item}
        </Paragraph>
      ))}
    </div>
  );
};

export default TypographyAnimate;
