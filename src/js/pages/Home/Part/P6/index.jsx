import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useSpringWave } from 'js/hooks';
import cn from 'classnames';
import { TypographyAnimate } from 'js/components';
import styles from './index.module.scss';
import bucketImg from 'assets/images/p6/bucket.png';
import mail0Img from 'assets/images/p6/mail0.png';
import mail1Img from 'assets/images/p6/mail1.png';
import mail2Img from 'assets/images/p6/mail2.png';

const Part = ({ start }) => {
  const [dotStyle] = useSpringWave({
    delay: 2000,
    start,
    config: { tension: 200, friction: 50 },
    transformDeclare: ['translateX', -70, 0],
  });
  const { bucketDelta } = useSpring({
    delay: 500,
    from: { bucketDelta: 0 },
    to: { bucketDelta: start ? 1 : 0 },
    config: { tension: 250, friction: 70 },
  });
  const bucketStyle = {
    opacity: bucketDelta.interpolate({
      range: [0, 0.2, 1],
      output: [0, 1, 1],
    }),
    transform: bucketDelta
      .interpolate({
        range: [0, 0.64, 0.74, 0.84, 0.94, 0.98, 1],
        output: [0, 1.05, 1.05, 0.95, 1.01, 0.99, 1],
      })
      .interpolate((bucketDelta) => {
        const scale = bucketDelta;
        return `scale(${scale})`;
      }),
  };

  const mailList = [mail0Img, mail1Img, mail2Img];
  const mailStyle = useSpring({
    delay: 1000,
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
          deltaDelay={20}
          transformType="translateY"
          from={80}
          to={0}
          config={{ tension: 250, friction: 100 }}
          start={start}
        >
          <p className={styles.white}>这一年</p>
          <p className={styles.white}>你收到来自189邮箱投递的</p>
          <p>
            <span className={styles.white}>电信账单类邮件共</span>
            <span className={styles.bold}>20</span>
            <span className={styles.white}>封，</span>
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
          config={{ tension: 100, friction: 200 }}
          start={start}
          rotate={true}
        >
          <p className={styles.white}>忙碌时无需担心，</p>
          <p className={styles.white}>你的每笔消费我们都贴心帮你记下了~</p>
        </TypographyAnimate>
      </div>
      <animated.img
        className={cn('observe', styles.bucketImg)}
        style={bucketStyle}
        src={bucketImg}
        alt="bucketImg"
      />
      {mailList.map((src, k) => (
        <animated.img
          key={k}
          style={mailStyle}
          className={cn('flowAnimate', styles.mail, styles[`mail${k}`])}
          src={src}
          alt="mail"
        />
      ))}
    </div>
  );
};

export default Part;
