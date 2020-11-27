import React, {
  useReducer,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useSpring, animated } from 'react-spring';
import cn from 'classnames';
import * as Part from './Part';
import { reducer, initState } from './store';
import { slidePageDistance, slidePageDuring, partLengh } from 'config';
import musicOn from 'assets/images/musicOn.png';
import musicOff from 'assets/images/musicOff.png';
import nextPic from 'assets/images/next.png';
import styles from './index.module.scss';

const Home = () => {
  const touchstartRef = useRef();
  const [state, dispatch] = useReducer(reducer, initState);
  const setState = (payload) => dispatch({ type: 'setState', payload });

  const firstScreenAnimate = useSpring({
    from: { opacity: state.showBill ? 1 : 0 },
    to: { opacity: state.showBill ? 0 : 1, zIndex: state.showBill ? 0 : 1 },
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
        console.log('触发了!');
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

  useEffect(
    () =>
      document.body.addEventListener(
        'touchmove',
        (e) => {
          e.preventDefault();
        },
        { passive: false }
      ),
    []
  );

  useEffect(() => {
    if (state.showBill) {
      let startArr = [...state.startArr];
      startArr[0] = true;
      setState({ startArr });
      window.document.addEventListener('touchstart', slidePageTouchstart);
      window.document.addEventListener('touchend', slidePageTouchend);
    }
  }, [state.showBill, slidePageTouchend]);

  return (
    <div className={styles.container}>
      {state.mobile && <div className={styles.fixedMobile}>{state.mobile}</div>}
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
      <div
        className={cn(styles.fixedNext, {
          [styles.show]:
            state.showBill && state.slidePageCurrentIndex < partLengh - 1,
        })}
      >
        <img src={nextPic} alt="next" />
      </div>
      <animated.div
        style={firstScreenAnimate}
        className={styles.firstScreen}
        onClick={() => setState({ showBill: true })}
      >
        这里是首屏, 点我进入账单
      </animated.div>
      <div
        className={cn(styles.bill, { [styles.show]: state.showBill })}
        style={{
          transition: `${slidePageDuring / 1000}s cubic-bezier(0, 0.5, 0.5, 1)`,
          transform: `translateY(-${slidePageAnimate}px)`,
        }}
      >
        {new Array(partLengh).fill().map((_, k) => {
          const PartComponent = Part[`P${k}`];
          return (
            <PartComponent key={k} start={state.startArr[k]}></PartComponent>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
