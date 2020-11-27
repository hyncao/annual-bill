import React from 'react';
import { useSpring, animated } from 'react-spring';

const Letter = ({ className, rotate = false, delay = 0, start, children }) => {
  const { x } = useSpring({
    delay,
    from: { x: 0 },
    to: { x: start && rotate ? 360 : 0 },
    config: { friction: 50 },
  });

  return (
    <animated.span
      className={className}
      style={{
        display: 'inline-block',
        transform: x.interpolate((x) => `rotateY(${x}deg)`),
      }}
    >
      {children}
    </animated.span>
  );
};

export default Letter;
