import React from 'react';
import cn from 'classnames';
import { useSpringWave } from 'js/hooks';
import { FoldAnimate, TypographyAnimate, Btn } from 'js/components';
import { splitNum } from 'config';
import bgImg from 'assets/images/p0/bg.png';
import picImg from 'assets/images/p3/pic.png';
import styles from './index.module.scss';

const Part = ({ start }) => {
  const [dotStyle, animated] = useSpringWave({
    delay: 2000,
    start,
    config: { tension: 200, friction: 50 },
    transformDeclare: ['translateX', -70, 0],
  });

  const [btnStyle] = useSpringWave({
    delay: 2300,
    start,
    config: { tension: 200, friction: 50 },
    transformDeclare: ['translateY', 70, 0],
  });

  return (
    <div className={styles.content}>
      <FoldAnimate
        className={styles.fold}
        bgImg={bgImg}
        splitNum={splitNum}
        start={start}
      />
      <img className={cn('observe', styles.pic)} src={picImg} alt="pic" />
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
            <span className={styles.white}>你通话总共</span>
            <span className={styles.bold}>854</span>
            <span className={styles.white}>分钟，</span>
          </p>
          <p>
            <span className={styles.white}>超过了</span>
            <span className={styles.bold}>92%</span>
            <span className={styles.white}>的人，</span>
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
          <p className={styles.yellow}>你接电话总比打电话多，</p>
          <p className={styles.white}>是个很温暖又被需要的人哦~</p>
        </TypographyAnimate>
        <div className={styles.btn}>
          <animated.div style={btnStyle}>
            <Btn>办理副卡</Btn>
          </animated.div>
        </div>
        <TypographyAnimate
          className={styles.bottom}
          delay={2500}
          transformType="translateY"
          from={80}
          to={0}
          config={{ tension: 250, friction: 60 }}
          start={start}
        >
          <p>与最心爱的人共享套餐，分享专属的爱~</p>
        </TypographyAnimate>
      </div>
    </div>
  );
};

export default Part;
