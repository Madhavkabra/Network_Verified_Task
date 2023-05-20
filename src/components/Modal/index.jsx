import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { Container } from '../Container';

export const Modal = ({ children, open }) => {
  if (!open) {
    return;
  }

  return (
    <div className={styles.root}>
      <Container>{children}</Container>
    </div>
  );
};

Modal.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};
