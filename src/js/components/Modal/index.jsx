import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import styles from './index.module.scss';

const Modal = ({ show, maskOpacity = 0.5, maskClick, children }) => {
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    setModalShow(show);
  }, [show]);

  return (
    <div className={cn(styles.content, { [styles.show]: modalShow })}>
      <div className={styles.box}>{children}</div>
      <div
        className={styles.mask}
        style={{
          opacity: maskOpacity,
        }}
        onClick={maskClick ? maskClick : () => {}}
      />
    </div>
  );
};

export default Modal;
