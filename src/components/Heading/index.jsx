import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export const Heading = ({ title }) => {
  return (
    <>
      <h1 className={styles.title}>{title}</h1>

      <hr className={styles.divider} />
    </>
  );
};

Heading.propTypes = {
  title: PropTypes.string.isRequired,
};
