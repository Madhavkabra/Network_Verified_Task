import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.css';

export const Input = ({ name, value, placeholder, customStyle, onChange }) => {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={cx(styles.input, customStyle)}
    />
  );
};

Input.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  customStyle: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
