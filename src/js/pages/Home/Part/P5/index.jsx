import React from 'react';
import cn from 'classnames';
import { useSpringWave } from 'js/hooks';
import { FoldAnimate, TypographyAnimate, Btn } from 'js/components';
import bgImg from 'assets/images/p0/bg.png';
import picImg from 'assets/images/p5/pic.png';
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
        splitNum={50}
        start={start}
        itemDirection="column"
        animateDirection="top"
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
            <span className={styles.white}>你在电信营业厅充了</span>
            <span className={styles.bold}>12</span>
            <span className={styles.white}>次话费</span>
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
          <p className={styles.white}>是啊，哪个人会没有一直坚持的事、</p>
          <p className={styles.white}>一直联系的人呢~~</p>
        </TypographyAnimate>
        <div className={styles.btn}>
          <animated.div style={btnStyle}>
            <Btn>官方充值享优惠</Btn>
          </animated.div>
        </div>
      </div>
    </div>
  );
};

export default Part;
