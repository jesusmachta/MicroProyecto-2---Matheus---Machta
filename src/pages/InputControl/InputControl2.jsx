import React, { forwardRef } from 'react';
import styles from './InputControl.module.css';

export const InputControl2 = forwardRef((props, ref) => {
  return (
    <div className={styles.container}>
      {props.label && <label>{props.label}</label>}
      <input type="text" {...props} ref={ref} />
    </div>
  );
});