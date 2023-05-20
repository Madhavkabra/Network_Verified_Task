import React, { useCallback, useEffect, useState } from 'react';
import { web3wallet } from '../../services/walletConnect/web3wallet/walletConnectUtils';
import { Container } from '../Container';
import { Heading } from '../Heading';
import { Button } from '../Button';
import styles from './styles.module.css';
import { WalletListItem } from '../WalletListItem';

export const PairingList = ({ onBack }) => {
  const [pairs, setPairs] = useState([]);

  const getPairingList = async () => {
    const pairs = await web3wallet.core.pairing.getPairings();

    const mappedPairs = pairs.map((pair) => ({
      name: pair?.peerMetadata?.name,
      url: pair?.peerMetadata?.url,
      icon: pair?.peerMetadata?.icons[0],
      topic: pair?.topic,
    }));

    setPairs(mappedPairs);
  };

  useEffect(() => {
    getPairingList();
  }, []);

  const disconnectPair = useCallback(async (topic) => {
    await web3wallet.core.pairing.disconnect({
      topic,
    });

    getPairingList();
  }, []);

  return (
    <Container>
      <div className={styles.header}>
        <Button
          title='Go Back'
          variant='error'
          onClick={onBack}
        />
        <Heading title='Pairing List' />
      </div>

      <div className={styles.root}>
        {pairs?.map((pair, pairIndex) => (
          <WalletListItem
            key={`${pairIndex}-${pair.topic}`}
            icon={pair.icon}
            name={pair.name}
            url={pair.url}
            onDelete={() => disconnectPair(pair.topic)}
          />
        ))}

        {!pairs.length && <p className={styles.notFound}>No Pairs Found</p>}
      </div>
    </Container>
  );
};
