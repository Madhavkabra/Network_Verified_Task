import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { Button } from '../Button';

export const WalletListItem = ({ icon, name, url, onDelete }) => {
  return (
    <div className={styles.basicInfoContainer}>
      <div className={styles.imgAndNameContainer}>
        <img
          src={icon}
          alt={name}
          className={styles.img}
        />

        <div className={styles.nameAndUrlContainer}>
          <label className={styles.name}>{name}</label>
          <a
            href={url}
            target='_blank'
            className={styles.url}
            rel='noreferrer'
          >
            {url}
          </a>
        </div>
      </div>

      <Button
        title='Delete'
        variant='error'
        onClick={onDelete}
      />
    </div>
  );
};

WalletListItem.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
