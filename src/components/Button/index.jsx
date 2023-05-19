import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.css';

const buttonVarians = {
  error: 'buttonError',
  warning: 'buttonWarning',
};

export const Button = ({ title, onClick, variant }) => {
  return (
    <button
      className={cx(styles.button, styles[buttonVarians[variant]])}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['error', 'warning']),
};
