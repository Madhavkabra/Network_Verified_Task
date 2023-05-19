import { VerifiedWallet } from '@verified-network/verified-sdk';
import React from 'react';
import { Container } from '../Container';
import { Heading } from '../Heading';

import { Button } from '../Button';
import styles from './styles.module.css';
import { useWalletContext } from '../../store/wallet/walletContext';

export const AddWallet = () => {
  const { setVerifiedWallet, setEthAddress } = useWalletContext();

  const handleCreateWallet = () => {
    const wallet = VerifiedWallet.createWallet();

    setVerifiedWallet(wallet);
    setEthAddress(wallet.address);
  };

  const handleImportMnemonicsWallet = async () => {
    const mnemonics = await VerifiedWallet.generateMnemonic();
    const wallet = VerifiedWallet.importWallet(mnemonics);

    setVerifiedWallet(wallet);
    setEthAddress(wallet.address);
  };

  return (
    <Container>
      <Heading title='Add New Wallet' />

      <div className={styles.buttonContainer}>
        <Button
          title='Import Mnemonics Wallet'
          variant='error'
          onClick={handleImportMnemonicsWallet}
        />
        <Button
          title='Create Wallet'
          variant='warning'
          onClick={handleCreateWallet}
        />
      </div>
    </Container>
  );
};
