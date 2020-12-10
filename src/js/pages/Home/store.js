import { partLengh } from 'config';

export const initState = {
  // 手机号码
  mobile: '159****2378',

  // 是否播放BGM
  musicPlay: false,

  // 协议是否勾选
  agreementRead: false,

  // 显示账单组件
  showBill: false,

  // 账单页面翻页控制
  slidePageDisabled: false,

  // 账单页面touchmove移动数量
  slidePageTranslate: 0,

  // 账单页面当前展示的页数
  slidePageCurrentIndex: 0,

  // 展示 Part 数组
  startArr: new Array(partLengh).fill(),
};

export const reducer = (state, action) => {
  const { type, payload } = action;
  let newState = { ...state };
  if (type === 'setState') {
    newState = {
      ...newState,
      ...payload,
    };
  }
  return newState;
};
