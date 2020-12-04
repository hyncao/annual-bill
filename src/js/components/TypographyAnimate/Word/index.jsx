import React from 'react';
import Letter from './Letter';

const Word = ({ children, ...otherProps }) => {
  const arrayWrapChildren = Array.isArray(children) ? children : [children];
  const renderReactChildren = (reactChildren, className, index) => {
    if (typeof reactChildren === 'string') {
      return (
        <span key={index} className={className}>
          {reactChildren.split('').map((letter, letterK) => (
            <Letter key={letterK} {...otherProps}>
              {letter}
            </Letter>
          ))}
        </span>
      );
    } else if (Array.isArray(reactChildren)) {
      return reactChildren.map((i, k) => renderReactChildren(i, null, k));
    } else {
      return renderReactChildren(
        reactChildren.props.children,
        reactChildren.props.className,
        index
      );
    }
  };

  return arrayWrapChildren.map((i, k) => renderReactChildren(i, null, k));
};

export default Word;
