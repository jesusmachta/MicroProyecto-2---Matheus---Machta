import React, { forwardRef } from 'react';
import styles from './InputControl.module.css';

export const InputControl2 = forwardRef((props, ref) => {
  const { readOnly, label, ...otherProps } = props;

  return (
    <div className={styles.container}>
      {label && <label>{label}</label>}
      <input type="text" {...otherProps} ref={ref} readOnly={readOnly} />
    </div>
  );
});

