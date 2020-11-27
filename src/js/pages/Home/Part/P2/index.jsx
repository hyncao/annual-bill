import React, { useCallback, useEffect, useMemo } from 'react';
import { useSpring, animated } from 'react-spring';
import cn from 'classnames';
import { TypographyAnimate } from 'js/components';
import styles from './index.module.scss';
import mobileImg from 'assets/images/p1/mobile.png';
import personImg from 'assets/images/p1/person.png';

const Part = ({ start }) => {
  const { personDelta } = useSpring({
    from: { personDelta: 0 },
    to: { personDelta: start ? 1 : 0 },
    config: { tension: 200, friction: 100 },
  });
  // 人物图片top css 值
  const personTopRem = 4.5;
  const personStyle = {
    transform: personDelta
      .interpolate({
        range: [0, 0.5, 0.55, 0.6, 0.7, 0.8, 0.9, 1],
        output: [
          window.innerHeight - (window.innerWidth / 7.5) * personTopRem,
          10,
          0,
          -4,
          4,
          -2,
          2,
          0,
        ],
      })
      .interpolate((personDelta) => `translateY(${personDelta}px)`),
  };
  const { mobileDelta } = useSpring({
    delay: 200,
    from: { mobileDelta: 0 },
    to: { mobileDelta: start ? 1 : 0 },
    config: { tension: 250, friction: 100 },
  });
  const mobileStyle = {
    opacity: mobileDelta.interpolate({
      range: [0, 0.7, 1],
      output: [0, 1, 1],
    }),
    transform: mobileDelta
      .interpolate({
        range: [0, 0.6, 0.7, 0.8, 0.9, 1],
        output: [0, 1.4, 0.9, 1.1, 0.98, 1],
      })
      .interpolate((mobileDelta) => {
        const scale = mobileDelta;
        const endOutput = 0.8; // 旋转动画截止output
        const rotate =
          mobileDelta < endOutput ? (mobileDelta * 180) / endOutput : 180;
        return `scale(${scale}) rotate(${rotate + 180}deg)`;
      }),
  };

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
          <p className={styles.white}>你喜欢的APP有好多，</p>
          <p className={styles.bold}>微信、淘宝、支付宝、</p>
          <p className={styles.bold}>QQ、飞猪......</p>
        </TypographyAnimate>

        <div className={styles.dot} />

        <TypographyAnimate
          className={styles.down}
          itemClassName={styles.upItem}
          delay={1500}
          deltaDelay={100}
          transformType="translateY"
          from={40}
          to={0}
          config={{ friction: 100 }}
          start={start}
          rotate={true}
        >
          <p className={styles.rotate}>其实不论什么时候，你身边都有我！</p>
        </TypographyAnimate>
      </div>
      <animated.img
        style={mobileStyle}
        className={styles.mobileImg}
        src={mobileImg}
        alt="mobileImg"
      />
      <animated.img
        style={personStyle}
        className={styles.personImg}
        src={personImg}
        alt="personImg"
      />
    </div>
  );
};

export default Part;
