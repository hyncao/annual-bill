import React from 'react';
import cn from 'classnames';
import { useSpringWave } from 'js/hooks';
import { TypographyAnimate, Btn } from 'js/components';
import styles from './index.module.scss';
import personImg from 'assets/images/p1/person.png';
import mobileImg from 'assets/images/p1/mobile.png';

const Part = ({ start }) => {
  const [dotStyle, animated] = useSpringWave({
    delay: 2000,
    start,
    config: { tension: 200, friction: 50 },
    transformDeclare: ['translateX', -70, 0],
  });

  const animateConfig = { tension: 200, friction: 60 };
  const clientWidth = window.document.documentElement.clientWidth;
  const range = [0, 0.93, 0.96, 0.98, 0.99, 1];
  const personOutput = [clientWidth, 0, -2, 0, 1, 0];
  const mobileOutput = [-clientWidth, 0, 2, 0, -1, 0];
  const [personStyle] = useSpringWave({
    start,
    config: animateConfig,
    transformDeclare: ['translateX', clientWidth, 0],
    range,
    output: personOutput,
  });

  const [mobileStyle] = useSpringWave({
    start,
    config: animateConfig,
    transformDeclare: ['translateX', -clientWidth, 0],
    range,
    output: mobileOutput,
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
          <p className={styles.white}>这一年</p>
          <p>
            <span className={styles.white}>你的流量用了</span>
            <span className={styles.bold}>23GB</span>
            <span className={styles.white}>，</span>
          </p>
          <p>
            <span className={styles.white}>大概只有</span>
            <span className={styles.bold}>18%</span>
            <span className={styles.white}>的人可以做到。</span>
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
          <p className={styles.yellow}>你用的5G，速度自然不是问题</p>
          <p className={styles.white}>不管工作还是追剧，少熬夜~</p>
        </TypographyAnimate>
      </div>
      <animated.img
        className={cn('observe', styles.mobile)}
        src={mobileImg}
        style={mobileStyle}
        alt="mobile"
      />
      <animated.img
        className={cn('observe', styles.person)}
        src={personImg}
        style={personStyle}
        alt="person"
      />
      <div className={styles.btn}>
        <animated.div style={btnStyle}>
          <Btn>购流量,享受腾讯会员</Btn>
        </animated.div>
      </div>
    </div>
  );
};

export default Part;
