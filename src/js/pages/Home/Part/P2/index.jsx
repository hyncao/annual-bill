import React, { useRef } from 'react';
import { useSpringWave, useRadar } from 'js/hooks';
import cn from 'classnames';
import { TypographyAnimate, Btn } from 'js/components';
import { rem2Px } from 'js/utils';
import { canvasShowImgSpeed } from 'config';
import styles from './index.module.scss';
import picImg from 'assets/images/p2/pic.png';
import topImg from 'assets/images/p2/top.png';

const Part = ({ start }) => {
  const canvasRef = useRef();
  const canvasMarginLeft = rem2Px(0.72);
  useRadar({
    canvasRef,
    start,
    width: window.document.documentElement.clientWidth - canvasMarginLeft * 2,
    img: picImg,
    speed: canvasShowImgSpeed,
  });
  const [dotStyle, animated] = useSpringWave({
    delay: 2000,
    start,
    config: { tension: 200, friction: 50 },
    transformDeclare: ['translateX', -70, 0],
  });
  const [canvasStyle] = useSpringWave({
    start,
    config: { tension: 200, friction: 50 },
    transformDeclare: ['scale', 0, 1],
  });
  const topConfig = {
    start,
    config: { tension: 200, friction: 100 },
    transformDeclare: ['translateY', 100, 0],
    otherAnimate: {
      opacity: (x) => x,
    },
  };
  const [top1Style] = useSpringWave({
    ...topConfig,
    delay: 1000,
  });

  const [btnStyle] = useSpringWave({
    delay: 2600,
    start,
    config: { tension: 200, friction: 100 },
    transformDeclare: ['translateY', 100, 0],
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
          <p className={cn(styles.white, styles.top)}>这一年</p>
          <p>
            <span className={styles.bold}>0-6</span>
            <span className={styles.white}>是你最黏手机的时候</span>
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
          <p className={styles.rotate}>我知道，你几乎整天都捧着手机</p>
          <p className={styles.rotate}>无拘无束，但耳边总感觉少了点谁的唠叨</p>
        </TypographyAnimate>
      </div>
      <div className={styles.topBox}>
        <animated.div className={cn(styles.item)} style={top1Style}>
          <img className="observe" src={topImg} alt="top" />
          <div className={styles.one}>Top1</div>
          <p>0-6点</p>
        </animated.div>
      </div>
      <animated.canvas
        style={canvasStyle}
        className={styles.canvas}
        ref={canvasRef}
      />
      <div className={styles.btnBox}>
        <animated.div style={btnStyle}>
          <Btn>一键补充流量</Btn>
        </animated.div>
      </div>
      <TypographyAnimate
        className={styles.bottom}
        delay={3000}
        transformType="translateY"
        from={80}
        to={0}
        config={{ tension: 250, friction: 60 }}
        start={start}
      >
        <p>救急包、深夜包、天包、月.....即刻补充~</p>
      </TypographyAnimate>
    </div>
  );
};

export default Part;
