import React from 'react';
import { FoldAnimate, TypographyAnimate } from 'js/components';
import { useSpringWave } from 'js/hooks';
import cn from 'classnames';
import styles from './index.module.scss';
import { splitNum } from 'config';
import bgImg from 'assets/images/p0/bg.png';
import cameraImg from 'assets/images/p8/camera.png';

const Part = ({ start }) => {
  const [dotStyle, animated] = useSpringWave({
    delay: 2000,
    start,
    config: { tension: 200, friction: 50 },
    transformDeclare: ['translateX', -70, 0],
  });
  return (
    <div className={styles.content}>
      <FoldAnimate
        className={styles.fold}
        bgImg={bgImg}
        splitNum={splitNum}
        start={start}
        delay={500}
      />

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
            <span className={styles.white}>天翼看家守护了你的家</span>
            <span className={styles.bold}>18</span>
            <span className={styles.white}>天，</span>
          </p>
          <p>
            <span className={styles.white}>为你保存了超过</span>
            <span className={styles.bold}>20</span>
            <span className={styles.white}>G视频；</span>
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
          <p className={styles.white}>虽然不能时刻陪伴家人、萌宠，</p>
          <p className={styles.white}>但看家一直都在为你记录生活的小确幸~</p>
        </TypographyAnimate>
      </div>
      <img
        className={cn('observe', 'flowAnimateX5', styles.camera)}
        src={cameraImg}
        alt="camera"
      />
    </div>
  );
};

export default Part;
