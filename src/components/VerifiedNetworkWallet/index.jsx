import React from 'react';
import { Container } from '../Container';
import { Heading } from '../Heading';
import {
  createWallet,
  importMnemonicsWallet,
} from '../../services/verifiedNetwork/walletCreateUtils';
import { Button } from '../Button';
import styles from './styles.module.css';

export const VerifiedNetworkWallet = () => {
  return (
    <Container>
      <Heading title='Add New Wallet' />

      <div className={styles.buttonContainer}>
        <Button
          title='Import Mnemonics Wallet'
          variant='error'
          onClick={importMnemonicsWallet}
        />
        <Button
          title='Create Wallet'
          variant='warning'
          onClick={createWallet}
        />
      </div>
    </Container>
  );
};
