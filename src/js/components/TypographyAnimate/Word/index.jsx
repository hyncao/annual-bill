import React from 'react';
import Letter from './Letter';

const Word = ({ children, ...otherProps }) => {
  const arrayWrapChildren = Array.isArray(children) ? children : [children];
  const renderReactChildren = (reactChildren, className) => {
    if (typeof reactChildren === 'string') {
      return reactChildren.split('').map((letter, letterK) => (
        <Letter key={letterK} className={className} {...otherProps}>
          {letter}
        </Letter>
      ));
    } else if (Array.isArray(reactChildren)) {
      return reactChildren.map((i) => renderReactChildren(i));
    } else {
      return renderReactChildren(
        reactChildren.props.children,
        reactChildren.props.className
      );
    }
  };

  return arrayWrapChildren.map((i) => renderReactChildren(i));
};

export default Word;
