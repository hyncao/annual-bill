import React, { useRef, useEffect } from 'react';
import { useSpringWave } from 'js/hooks';
import cn from 'classnames';
import { TypographyAnimate } from 'js/components';
import { MyCtx, rem2Px } from 'js/utils';
import { canvasShowImgSpeed } from 'config';
import styles from './index.module.scss';
import picImg from 'assets/images/p5/pic.png';
import btnImg from 'assets/images/p5/btn.png';
import top1Img from 'assets/images/p5/top1.png';
import top2Img from 'assets/images/p5/top2.png';
import top3Img from 'assets/images/p5/top3.png';
import top4Img from 'assets/images/p5/top4.png';

const topImgList = [top1Img, top2Img, top3Img, top4Img];

const Part = ({ start }) => {
  const canvasRef = useRef();
  const imgRef = useRef();
  const [dotStyle, animated] = useSpringWave({
    delay: 2000,
    start,
    config: { tension: 200, friction: 50 },
    transformDeclare: ['translateX', -70, 0],
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
  const [top2Style] = useSpringWave({
    ...topConfig,
    delay: 1050,
  });
  const [top3Style] = useSpringWave({
    ...topConfig,
    delay: 1100,
  });
  const [top4Style] = useSpringWave({
    ...topConfig,
    delay: 1150,
  });
  const topStyleList = [top1Style, top2Style, top3Style, top4Style];

  const [btnStyle] = useSpringWave({
    delay: 2600,
    start,
    config: { tension: 200, friction: 100 },
    transformDeclare: ['translateY', 100, 0],
  });

  useEffect(() => {
    imgRef.current = new Image();
    imgRef.current.src = picImg;
    if (start) {
      const init = () => {
        const draw = (i = 0) => {
          // canvas距离左右边距, 单位rem
          const marginLeft = rem2Px(0.6);
          const canvasWidth =
            window.document.documentElement.clientWidth - marginLeft * 2;
          canvasRef.current.width = canvasWidth;
          canvasRef.current.height = canvasWidth;
          const ctx = canvasRef.current.getContext('2d');
          const myCtx = new MyCtx(ctx);
          myCtx
            .save()
            .beginPath()
            .moveTo(canvasWidth / 2, canvasWidth / 2)
            .arc(
              canvasWidth / 2,
              canvasWidth / 2,
              canvasWidth / 2,
              Math.PI * 1.5,
              Math.PI * (1.5 + (i / 360) * canvasShowImgSpeed)
            )
            .lineTo(canvasWidth / 2, canvasWidth / 2)
            .closePath()
            .clip()
            .drawImage(imgRef.current, 0, 0, canvasWidth, canvasWidth)
            .restore();
          if (i < 360) {
            setTimeout(() => {
              draw(i + 2);
            }, 5);
          }
        };
        draw();
      };
      imgRef.current.onload = init;
    }
  }, [start]);

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
          config={{ friction: 100 }}
          start={start}
          rotate={true}
        >
          <p className={styles.rotate}>我知道，你几乎整天都捧着手机</p>
          <p className={styles.rotate}>无拘无束，但耳边总感觉少了点谁的唠叨</p>
        </TypographyAnimate>
      </div>
      <div className={styles.topBox}>
        {topImgList.map((i, k) => (
          <animated.div key={k} className={styles.item} style={topStyleList[k]}>
            <img src={i} alt="top" />
            <p>0-6点</p>
          </animated.div>
        ))}
      </div>
      <canvas className={styles.canvas} ref={canvasRef} />
      <div className={styles.btnBox}>
        <animated.img
          style={btnStyle}
          className={styles.btn}
          src={btnImg}
          alt="btnImg"
        />
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
