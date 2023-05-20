import React, { useState } from 'react';
import { Container } from '../Container';
import { Heading } from '../Heading';
import { useWalletContext } from '../../store/wallet';
import { Input } from '../Input';
import { Button } from '../Button';
import { web3WalletPair } from '../../services/walletConnect/web3wallet/walletConnectUtils';
import styles from './styles.module.css';
import PairingModal from '../PairingModal';
import { useSessionProposal } from '../../hooks/useSessionProposal';
import { useSessionRequest } from '../../hooks/useSessionRequest';
import SigningModal from '../SigningModal';
import { useSessionDisconnect } from '../../hooks/useSessionDisconnect';
import { PairingList } from '../PairingList';
import { SessionList } from '../SessionList';

export const ShowWallet = () => {
  const [wcUri, setWcUri] = useState('');
  const [activeTab, setActiveTab] = useState();
  const { ethAddress } = useWalletContext();

  const {
    proposal,
    acceptSessionProposal,
    cancelSessionProposal,
    successfulSession,
    setSuccessfulSession,
  } = useSessionProposal({ setWcUri });

  const { requestEvent, requestSession, setRequestEvent, setRequestSession } =
    useSessionRequest();

  const { disconnectSessions } = useSessionDisconnect({ setSuccessfulSession });

  const handleWcUriChange = (event) => {
    setWcUri(event.target.value);
  };

  const handlePairWallet = async () => {
    await web3WalletPair({ uri: wcUri });
  };

  return (
    <>
      {activeTab === 'pairing' && <PairingList onBack={() => setActiveTab()} />}
      {activeTab === 'session' && (
        <SessionList
          onBack={() => setActiveTab()}
          setSuccessfulSession={setSuccessfulSession}
        />
      )}

      {!activeTab && (
        <Container>
          <Heading title='Wallet Information' />

          <div className={styles.root}>
            <div>
              <h4 className={styles.title}>ETH Address</h4>

              <p className={styles.walletAddressText}>{ethAddress}</p>

              <div className={styles.formContainer}>
                {!successfulSession ? (
                  <>
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
                  </>
                ) : (
                  <Button
                    title='Disconnect Current Session'
                    variant='warning'
                    onClick={disconnectSessions}
                  />
                )}
              </div>
            </div>

            <div className={styles.actionButtonContainer}>
              <Button
                title='Pairings'
                variant='error'
                onClick={() => setActiveTab('pairing')}
              />
              <Button
                title='Sessions'
                variant='warning'
                onClick={() => setActiveTab('session')}
              />
            </div>
          </div>
        </Container>
      )}

      <PairingModal
        proposal={proposal}
        onAccept={acceptSessionProposal}
        onCancel={cancelSessionProposal}
      />

      <SigningModal
        requestEvent={requestEvent}
        requestSession={requestSession}
        setRequestEvent={setRequestEvent}
        setRequestSession={setRequestSession}
      />
    </>
  );
};
