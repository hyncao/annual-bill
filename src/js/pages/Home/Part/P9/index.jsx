import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useSpringWave, useModal } from 'js/hooks';
import { TypographyAnimate } from 'js/components';
import cn from 'classnames';
import styles from './index.module.scss';
import btnCardImg from 'assets/images/p9/btnCard.png';
import btnShareImg from 'assets/images/p9/btnShare.png';
import tipsImg from 'assets/images/p9/tips.png';
import congrongImg from 'assets/images/p9/congrong.png';
import guoganImg from 'assets/images/p9/guogan.png';
import jingjinImg from 'assets/images/p9/jingjin.png';
import shuaizhiImg from 'assets/images/p9/shuaizhi.png';
import xiaosaImg from 'assets/images/p9/xiaosa.png';
import zhuanzhuImg from 'assets/images/p9/zhuanzhu.png';
import telecomImg from 'assets/images/p9/telecom.png';
import codeImg from 'assets/images/p9/code.png';

const Part = ({ start }) => {
  const keywordList = {
    congrong: congrongImg,
    guogan: guoganImg,
    jingjin: jingjinImg,
    shuaizhi: shuaizhiImg,
    xiaosa: xiaosaImg,
    zhuanzhu: zhuanzhuImg,
  };

  const handleModal = useModal({
    children: (hideFn) => (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.title}>
            <p>2020,是你从容的一年</p>
            <img src={telecomImg} alt="telecom" />
          </div>
          <div className={styles.bar} />
          <div className={styles.card}>
            <img src={keywordList.congrong} alt="card" />
          </div>
          <div className={styles.bottom}>
            <img src={codeImg} alt="code" />
            <div className={styles.detail}>
              <p className={styles.bold}>我也写了点东西，关于你的</p>
              <p className={styles.gray}>扫码或长按就可以看到了</p>
            </div>
          </div>
        </div>
        <div className={styles.modalClose} onClick={hideFn}>
          关闭
        </div>
      </div>
    ),
  });

  const [dotStyle] = useSpringWave({
    delay: 2500,
    start,
    config: { tension: 200, friction: 50 },
    transformDeclare: ['translateX', -70, 0],
  });

  const range = [0, 0.78, 0.86, 0.92, 0.96, 0.98, 0.99, 1];
  const output = [500, -5, 4, -3, 1, -0.5, 0.25, 0];
  const [keywordStyle] = useSpringWave({
    delay: 500,
    start,
    config: { tension: 200, friction: 60 },
    transformDeclare: ['translateY', 500, 0],
    range,
    output,
  });

  const btnStyle = {
    start,
    config: { tension: 200, friction: 80 },
    transformDeclare: ['translateY', 150, 0],
  };
  const [btnShareStyle] = useSpringWave({
    delay: 2500,
    ...btnStyle,
  });
  const [btnCardStyle] = useSpringWave({
    delay: 2600,
    ...btnStyle,
  });

  const tipsStyle = useSpring({
    delay: 3000,
    from: { opacity: 0 },
    to: { opacity: start ? 1 : 0 },
  });

  return (
    <div className={styles.content}>
      <div className={styles.text}>
        <TypographyAnimate
          className={styles.up}
          itemClassName={styles.upItem}
          delay={1000}
          deltaDelay={100}
          transformType="translateY"
          from={80}
          to={0}
          config={{ tension: 250, friction: 60 }}
          start={start}
        >
          <p className={styles.white}>这一年</p>
          <p>
            <span className={styles.white}>我想是你</span>
            <span className={styles.bold}>潇洒</span>
            <span className={styles.white}>的一年</span>
          </p>
        </TypographyAnimate>

        <animated.div className={styles.dot} style={dotStyle} />

        <TypographyAnimate
          className={styles.down}
          itemClassName={styles.upItem}
          delay={2000}
          deltaDelay={100}
          transformType="translateY"
          from={40}
          to={0}
          config={{ friction: 150 }}
          start={start}
          rotate={true}
        >
          <p className={styles.white}>无论怎样，</p>
          <p className={styles.white}>2020，都丰富了你的经历</p>
          <p className={styles.white}>增加了你生命的厚度;</p>
          <p className={styles.white}>2021,</p>
          <p className={styles.white}>请务必过好属于你的新的一年。</p>
        </TypographyAnimate>
      </div>
      <animated.img
        className={cn('observe', styles.keyword)}
        src={keywordList.congrong}
        style={keywordStyle}
        alt="keyword"
      />
      <animated.img
        className={cn('observe', styles.btn, styles.btnShareImg)}
        src={btnShareImg}
        style={btnShareStyle}
        alt="share"
      />
      <animated.img
        className={cn('observe', styles.btn, styles.btnCardImg)}
        src={btnCardImg}
        style={btnCardStyle}
        alt="card"
        onClick={() => handleModal.show()}
      />
      <animated.img
        className={styles.tipsImg}
        src={tipsImg}
        style={tipsStyle}
        alt="tips"
      />
    </div>
  );
};

export default Part;
