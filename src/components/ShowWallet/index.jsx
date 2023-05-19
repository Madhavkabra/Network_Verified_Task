import React, { useState } from 'react';
import { Container } from '../Container';
import { Heading } from '../Heading';
import { useWalletContext } from '../../store/wallet';
import { Input } from '../Input';
import { Button } from '../Button';
import { web3WalletPair } from '../../services/walletConnect/web3wallet/walletConnectUtils';
import styles from './styles.module.css';

export const ShowWallet = () => {
  const [wcUri, setWcUri] = useState('');
  const { ethAddress } = useWalletContext();

  const handleWcUriChange = (event) => {
    setWcUri(event.target.value);
  };

  const handlePairWallet = async () => {
    await web3WalletPair({ uri: wcUri });
  };

  return (
    <Container>
      <Heading title='Wallet Information' />

      <div>
        <h4 className={styles.title}>ETH Address</h4>

        <p className={styles.walletAddressText}>{ethAddress}</p>

        <div className={styles.formContainer}>
          <Input
            placeholder='Enter WC URI (wc:2131...)'
            value={wcUri}
            onChange={handleWcUriChange}
          />
          <Button
            title='Pair Wallet'
            variant='error'
            onClick={handlePairWallet}
            disabled={!wcUri}
          />
        </div>
      </div>
    </Container>
  );
};
