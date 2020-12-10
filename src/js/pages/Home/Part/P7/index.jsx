import React from 'react';
import cn from 'classnames';
import { useSpringWave } from 'js/hooks';
import { TypographyAnimate, Btn } from 'js/components';
import styles from './index.module.scss';
import leftImg from 'assets/images/p7/left.png';
import rightImg from 'assets/images/p7/right.png';

const Part = ({ start }) => {
  const [dotStyle, animated] = useSpringWave({
    delay: 2000,
    start,
    config: { tension: 200, friction: 50 },
    transformDeclare: ['translateX', -70, 0],
  });

  const animateConfig = { tension: 200, friction: 40 };
  const clientWidth = window.document.documentElement.clientWidth;
  const range = [0, 0.93, 0.96, 0.98, 0.99, 1];
  const rightOutput = [clientWidth, 0, -2, 0, 1, 0];
  const leftOutput = [-clientWidth, 0, 2, 0, -1, 0];
  const [rightStyle] = useSpringWave({
    delay: 1000,
    start,
    config: animateConfig,
    transformDeclare: ['translateX', clientWidth, 0],
    range,
    output: rightOutput,
  });

  const [leftStyle] = useSpringWave({
    delay: 500,
    start,
    config: animateConfig,
    transformDeclare: ['translateX', -clientWidth, 0],
    range,
    output: leftOutput,
  });

  const [btnStyle] = useSpringWave({
    delay: 2300,
    start,
    config: { tension: 200, friction: 50 },
    transformDeclare: ['translateY', 70, 0],
  });

  return (
    <div className={styles.content}>
      <div className={styles.text}>
        <TypographyAnimate
          className={styles.up}
          itemClassName={styles.upItem}
          delay={500}
          deltaDelay={100}
          transformType="translateY"
          from={80}
          to={0}
          config={{ tension: 250, friction: 60 }}
          start={start}
        >
          <p className={styles.white}>这一年，</p>
          <p>
            <span className={styles.white}>你签到</span>
            <span className={styles.bold}>8</span>
            <span className={styles.white}>次，摸金</span>
            <span className={styles.bold}>6</span>
            <span className={styles.white}>次；</span>
          </p>
          <p>
            <span className={styles.white}>有来有往，你也得到了</span>
            <span className={styles.bold}>20</span>
            <span className={styles.white}>元话费；</span>
          </p>
        </TypographyAnimate>

        <animated.div className={styles.dot} style={dotStyle} />

        <TypographyAnimate
          className={styles.down}
          itemClassName={styles.upItem}
          delay={1500}
          deltaDelay={100}
          transformType="translateY"
          from={40}
          to={0}
          config={{ friction: 150 }}
          start={start}
          rotate={true}
        >
          <p>
            <span className={styles.white}>大概</span>
            <span className={styles.yellow}>1%的人得到了10元话费</span>
          </p>
          <p className={styles.white}>新的一年还是要多来多走动，得更多。</p>
        </TypographyAnimate>
      </div>
      <animated.img
        className={cn('observe', styles.left)}
        src={leftImg}
        style={leftStyle}
        alt="left"
      />
      <animated.img
        className={cn('observe', styles.right)}
        src={rightImg}
        style={rightStyle}
        alt="right"
      />
      <div className={styles.btn}>
        <animated.div style={btnStyle}>
          <Btn>兑换好礼</Btn>
        </animated.div>
      </div>
    </div>
  );
};

export default Part;
