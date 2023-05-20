import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.css';

const buttonVarians = {
  error: 'buttonError',
  warning: 'buttonWarning',
  success: 'buttonSuccess',
};

export const Button = ({ title, onClick, variant, disabled }) => {
  return (
    <button
      className={cx(styles.button, styles[buttonVarians[variant]])}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['error', 'warning', 'success']),
  disabled: PropTypes.bool,
};
