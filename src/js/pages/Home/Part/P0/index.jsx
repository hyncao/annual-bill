import React, { useRef } from 'react';
import { useSpringWave, useRadar } from 'js/hooks';
import { useSpring } from 'react-spring';
import cn from 'classnames';
import { TypographyAnimate, Btn } from 'js/components';
import { rem2Px } from 'js/utils';
import { canvasShowImgSpeed } from 'config';
import styles from './index.module.scss';
import picImg from 'assets/images/p0/pic.png';
import tipsImg from 'assets/images/p0/tips.png';

const Part = ({ start }) => {
  const canvasRef = useRef();
  const canvasMarginLeft = rem2Px(0.6);
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
  const [btnStyle] = useSpringWave({
    delay: 2300,
    start,
    config: { tension: 200, friction: 50 },
    transformDeclare: ['translateY', 70, 0],
  });
  const tipsStyle = useSpring({
    delay: 2600,
    from: { opacity: 0 },
    to: { opacity: start ? 1 : 0 },
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
          <p className={cn(styles.bold, styles.top)}>13812121212</p>
          <p className={styles.white}>这个号码，</p>
          <p>
            <span className={styles.white}>已经陪伴了你超过</span>
            <span className={cn(styles.bold, styles.day)}>854</span>
            <span className={styles.white}>天。</span>
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
          <p className={styles.rotate}>
            我写了点东西，都是这一年来攒在心里的小事。
          </p>
        </TypographyAnimate>
      </div>
      <animated.canvas
        style={canvasStyle}
        className={styles.canvas}
        ref={canvasRef}
      />
      <div className={styles.btn}>
        <animated.div style={btnStyle}>
          <Btn>下载电信营业厅APP</Btn>
        </animated.div>
      </div>
      <animated.img
        className={cn(styles.tipsImg)}
        style={tipsStyle}
        src={tipsImg}
        alt="tips"
      />
      <TypographyAnimate
        className={styles.bottom}
        delay={2600}
        transformType="translateY"
        from={80}
        to={0}
        config={{ tension: 250, friction: 60 }}
        start={start}
      >
        <p>更多服务，触手可及</p>
      </TypographyAnimate>
    </div>
  );
};

export default Part;
