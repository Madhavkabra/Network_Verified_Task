import { getSdkError } from '@walletconnect/utils';
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { web3wallet } from '../../services/walletConnect/web3wallet/walletConnectUtils';
import { Container } from '../Container';
import { Heading } from '../Heading';
import { Button } from '../Button';
import styles from './styles.module.css';
import { WalletListItem } from '../WalletListItem';

export const SessionList = ({ onBack, setSuccessfulSession }) => {
  const [sessions, setSessions] = useState([]);

  const getSessionList = async () => {
    const activeSessions = await web3wallet.getActiveSessions();

    const mappedSessions = Object.values(activeSessions).map((session) => ({
      name: session?.peer?.metadata?.name,
      url: session?.peer?.metadata?.url,
      icon: session?.peer?.metadata?.icons[0],
      topic: session?.topic,
    }));

    setSessions(mappedSessions);
  };

  useEffect(() => {
    getSessionList();
  }, []);

  const disconnectSession = useCallback(async (topic) => {
    await web3wallet.disconnectSession({
      topic,
      reason: getSdkError('USER_DISCONNECTED'),
    });

    getSessionList();
    setSuccessfulSession(false);
  }, []);

  return (
    <Container>
      <div className={styles.header}>
        <Button
          title='Go Back'
          variant='error'
          onClick={onBack}
        />
        <Heading title='Active Sessions' />
      </div>

      <div className={styles.root}>
        {sessions?.map((pair, pairIndex) => (
          <WalletListItem
            key={`${pairIndex}-${pair.topic}`}
            icon={pair.icon}
            name={pair.name}
            url={pair.url}
            onDelete={() => disconnectSession(pair.topic)}
          />
        ))}

        {!sessions.length && (
          <p className={styles.notFound}>No Sessions Found</p>
        )}
      </div>
    </Container>
  );
};

SessionList.propTypes = {
  onBack: PropTypes.func.isRequired,
  setSuccessfulSession: PropTypes.func.isRequired,
};
