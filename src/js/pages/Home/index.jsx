import React, {
  useReducer,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useSpring, animated } from 'react-spring';
import { useSpringWave, useModal } from 'js/hooks';
import cn from 'classnames';
import * as Part from './Part';
import { FoldAnimate } from 'js/components';
import { reducer, initState } from './store';
import {
  splitNum,
  slidePageDistance,
  slidePageDuring,
  partLengh,
} from 'config';
import musicOn from 'assets/images/musicOn.png';
import musicOff from 'assets/images/musicOff.png';
import nextImg from 'assets/images/next.png';
import telecomImg from 'assets/images/telecom.png';
import bgImg from 'assets/images/home/bg.png';
import sloganImg from 'assets/images/home/slogan.png';
import titleImg from 'assets/images/home/title.png';
import btnImg from 'assets/images/home/btn.png';
import picImg from 'assets/images/home/pic.png';
import checkedImg from 'assets/images/home/checked.png';
import styles from './index.module.scss';

const Home = () => {
  const touchstartRef = useRef();
  const [state, dispatch] = useReducer(reducer, initState);
  const setState = (payload) => dispatch({ type: 'setState', payload });

  const [sloganStyle] = useSpringWave({
    start: true,
    delay: 1000,
    transformDeclare: ['scale', 0, 1],
  });

  const [titleStyle] = useSpringWave({
    start: true,
    delay: 1100,
    transformDeclare: ['translateY', 60, 0],
  });

  const [btnStyle] = useSpringWave({
    start: true,
    delay: 2000,
    transformDeclare: ['translateY', 60, 0],
    config: { friction: 200 },
  });

  const agreementStyle = useSpring({
    delay: 2200,
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const slidePageAnimate = useMemo(() => {
    const WINDOW_HEIGHT = window.innerHeight;
    return state.slidePageCurrentIndex * WINDOW_HEIGHT;
  }, [state.slidePageCurrentIndex]);

  const slidePageTouchstart = (e) => {
    touchstartRef.current = e.touches[0].clientY;
  };

  const slidePageTouchend = useCallback(
    (e) => {
      if (state.slidePageDisabled) return;
      const endY = e.changedTouches[0].clientY;
      const direction = touchstartRef.current - endY > 0 ? 'up' : 'down';
      let canTrigger = true;
      if (state.slidePageCurrentIndex === 0 && direction === 'down') {
        canTrigger = false;
      }
      if (state.slidePageCurrentIndex === partLengh - 1 && direction === 'up') {
        canTrigger = false;
      }
      if (
        Math.abs(touchstartRef.current - endY) > slidePageDistance &&
        canTrigger
      ) {
        console.log('触发滚动了!');
        window.document.removeEventListener('touchstart', slidePageTouchstart);
        window.document.removeEventListener('touchend', slidePageTouchend);
        let slidePageCurrentIndex =
          direction === 'up'
            ? state.slidePageCurrentIndex + 1
            : state.slidePageCurrentIndex - 1;
        if (slidePageCurrentIndex < 0) {
          slidePageCurrentIndex = 0;
        }
        if (slidePageCurrentIndex > partLengh - 1) {
          slidePageCurrentIndex = partLengh - 1;
        }
        setState({
          slidePageCurrentIndex,
          slidePageDisabled: true,
        });
        setTimeout(() => {
          let startArr = [...state.startArr];
          startArr[slidePageCurrentIndex] = true;
          setState({ slidePageDisabled: false, startArr });
        }, slidePageDuring);
      }
    },
    [state.slidePageCurrentIndex, state.slidePageDisabled]
  );

  useEffect(() => {
    // 阻止浏览器滑动行为
    document.body.addEventListener(
      'touchmove',
      (e) => {
        e.preventDefault();
      },
      { passive: false }
    );

    // 为img标签统一添加onload事件
    const imgList = [...document.getElementsByClassName('observe')];
    const promiseList = imgList.map(
      (i) =>
        new Promise((res) => {
          i.onload = () => {
            res(true);
          };
        })
    );
    Promise.all(promiseList).then((res) => {
      console.log('图片全部加载好了');
    });
  }, []);

  useEffect(() => {
    if (state.showBill) {
      let startArr = [...state.startArr];
      startArr[0] = true;
      setState({ startArr });
      const document = window.document;
      document.addEventListener('touchstart', slidePageTouchstart);
      document.addEventListener('touchend', slidePageTouchend);
    }
  }, [state.showBill, slidePageTouchend]);

  const renderMobile = () =>
    state.mobile &&
    state.showBill && <div className={styles.fixedMobile}>{state.mobile}</div>;

  const renderMusic = () => (
    <div
      className={styles.fixedMusic}
      onClick={() => {
        console.log('点击音乐');
        setState({ musicPlay: !state.musicPlay });
      }}
    >
      <img
        className={cn({ [styles.play]: state.musicPlay })}
        src={state.musicPlay ? musicOn : musicOff}
        alt="music"
      />
    </div>
  );

  const renderNextArrow = () => (
    <div
      className={cn(styles.fixedNext, {
        [styles.show]:
          state.showBill && state.slidePageCurrentIndex < partLengh - 1,
      })}
    >
      <img src={nextImg} alt="next" />
    </div>
  );

  const handleModal = useModal({
    children: (hideFn) => (
      <div className={styles.rule}>
        <div className={styles.title}>信息查看相关说明</div>
        <div className={styles.content}>
          中国电信在本年度账单中使用您的历史通信数据及记录数据。您的账单信息只有您本人有权查看，需要您本人勾选“同意”，才能查看属于您的年度账单。
        </div>
        <div className={styles.btn} onClick={hideFn}>
          我知道了
        </div>
      </div>
    ),
  });

  const showRule = useCallback(() => {
    handleModal.show();
  }, [handleModal]);

  const startBill = useCallback(() => {
    if (state.agreementRead) {
      setState({ showBill: true });
    }
  }, [state.agreementRead]);

  const renderHomePage = () => (
    <div className={styles.home}>
      {!state.showBill && (
        <img className={cn(styles.telecom)} src={telecomImg} alt="telecom" />
      )}
      <FoldAnimate
        className={styles.fold}
        bgImg={bgImg}
        splitNum={splitNum}
        start={true}
        delay={500}
      />
      <div className={styles.content}>
        <img className={cn('observe', styles.pic)} src={picImg} alt="pic" />
        <animated.img
          className={cn('observe', styles.slogan)}
          style={sloganStyle}
          src={sloganImg}
          alt="slogan"
        />
        <div className={styles.title}>
          <animated.img
            className={cn('observe', styles.titleImg)}
            style={titleStyle}
            src={titleImg}
            alt="title"
          />
        </div>
        <div className={styles.btn}>
          <animated.img
            className={cn(styles.btnImg)}
            style={btnStyle}
            src={btnImg}
            alt="btn"
            onClick={startBill}
          />
        </div>
        <animated.div className={styles.agreement} style={agreementStyle}>
          <div onClick={() => setState({ agreementRead: true })}>
            {state.agreementRead ? (
              <img
                className={cn('observe', styles.checked)}
                src={checkedImg}
                alt="checked"
              />
            ) : (
              <span className={styles.dot} />
            )}
            我已阅读并同意《
          </div>
          <span onClick={showRule} className={styles.link}>
            信息查看相关说明
          </span>
          》
        </animated.div>
      </div>
    </div>
  );

  const renderBillPart = () => (
    <div
      className={cn(styles.bill, { [styles.show]: state.showBill })}
      style={{
        transition: `${slidePageDuring / 1000}s cubic-bezier(0, 0.5, 0.5, 1)`,
        transform: `translateY(-${slidePageAnimate}px)`,
      }}
    >
      {new Array(partLengh).fill().map((_, k) => {
        // TODO
        // 将调试中的页面放到第一屏, 方便调试, 省的看动画
        let index = k;
        if (k === 0) {
          // 这里输入想要调试的页面序号
          index = 0;
        }
        // TODO END
        const PartComponent = Part[`P${index}`];
        return (
          <PartComponent key={k} start={state.startArr[k]}></PartComponent>
        );
      })}
    </div>
  );

  return (
    <div className={styles.container}>
      {renderMobile()}
      {renderMusic()}
      {renderNextArrow()}
      {renderHomePage()}
      {renderBillPart()}
    </div>
  );
};

export default Home;
