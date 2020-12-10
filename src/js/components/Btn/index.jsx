import React from 'react';
import cn from 'classnames';
import styles from './index.module.scss';

const Btn = ({ className, children, ...otherProps }) => (
  <div className={cn(styles.btn, className)} {...otherProps}>
    {children}
  </div>
);

export default Btn;
