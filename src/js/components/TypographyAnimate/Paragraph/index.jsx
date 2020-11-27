import React, { useCallback, useEffect, useMemo } from 'react';
import { useSpringWave } from 'js/hooks';
import cn from 'classnames';
import Word from '../Word';
import styles from './index.module.scss';

const Paragraph = ({
  className,
  delay = 0,
  start,
  transformType,
  from,
  to,
  config,
  children,
  ...otherProps
}) => {
  const [springStyle, animated] = useSpringWave({
    start,
    delay,
    config,
    transformDeclare: [transformType, from, to],
    otherAnimate: {
      opacity: (x) => x,
    },
  });

  const arrayWrapChildren = Array.isArray(children) ? children : [children];

  return (
    <div className={cn(className, styles.box)}>
      <animated.div className={styles.item} style={springStyle}>
        {arrayWrapChildren.map((item, k) => (
          <Word key={k} delay={delay} start={start} {...otherProps}>
            {item}
          </Word>
        ))}
      </animated.div>
    </div>
  );
};

export default Paragraph;
