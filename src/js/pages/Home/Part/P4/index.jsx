import React from 'react';
import cn from 'classnames';
import { useSpring } from 'react-spring';
import { useSpringWave } from 'js/hooks';
import { TypographyAnimate } from 'js/components';
import mobileImg from 'assets/images/p4/mobile.png';
import personImg from 'assets/images/p4/person.png';
import styles from './index.module.scss';

const Part = ({ start }) => {
  const personTopRem = 4.5;
  const [personStyle, animated] = useSpringWave({
    start,
    config: { tension: 250, friction: 70 },
    transformDeclare: [
      'translateY',
      window.innerHeight - (window.innerWidth / 7.5) * personTopRem,
      0,
    ],
  });

  const [dotStyle] = useSpringWave({
    delay: 2000,
    start,
    config: { tension: 200, friction: 50 },
    transformDeclare: ['translateX', -70, 0],
  });

  const { mobileDelta } = useSpring({
    delay: 200,
    from: { mobileDelta: 0 },
    to: { mobileDelta: start ? 1 : 0 },
    config: { tension: 250, friction: 70 },
  });
  const mobileStyle = {
    opacity: mobileDelta.interpolate({
      range: [0, 0.7, 1],
      output: [0, 1, 1],
    }),
    transform: mobileDelta
      .interpolate({
        range: [0, 0.7, 0.82, 0.92, 0.98, 1],
        output: [0, 1.4, 0.8, 1.05, 0.98, 1],
      })
      .interpolate((mobileDelta) => {
        const scale = mobileDelta;
        const endOutput = 0.8; // 旋转动画截止output
        const rotate =
          mobileDelta < endOutput ? (mobileDelta * 360) / endOutput : 0;
        return `scale(${scale}) rotate(${rotate}deg)`;
      }),
  };

  return (
    <div className={styles.content}>
      <div className={styles.text}>
        <TypographyAnimate
          className={styles.up}
          itemClassName={styles.upItem}
          delay={500}
          deltaDelay={20}
          transformType="translateY"
          from={80}
          to={0}
          config={{ tension: 250, friction: 100 }}
          start={start}
        >
          <p className={styles.white}>这一年</p>
          <p className={styles.white}>你喜欢的APP有好多，</p>
          <p className={styles.bold}>微信、淘宝、支付宝、</p>
          <p className={styles.bold}>QQ、飞猪......</p>
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
          <p className={styles.white}>其实不论什么时候，你身边都有我！</p>
        </TypographyAnimate>
      </div>
      <animated.img
        className={cn('observe', styles.mobileImg)}
        style={mobileStyle}
        src={mobileImg}
        alt="mobileImg"
      />
      <animated.img
        className={cn('observe', styles.personImg)}
        style={personStyle}
        src={personImg}
        alt="personImg"
      />
    </div>
  );
};

export default Part;
