import { useState, useCallback, useEffect } from 'react';
import { getSdkError } from '@walletconnect/utils';
import {
  currentETHAddress,
  useInitialization,
  web3WalletPair,
  web3wallet,
} from './services/walletConnect/web3wallet/walletConnectUtils';
import PairingModal from './components/PairingModal';
import { EIP155_SIGNING_METHODS } from './services/walletConnect/web3wallet/eip155Lib';
import SigningModal from './components/SigningModal';
import { Container } from './components/Container';
import { Heading } from './components/Heading';
import { AddWallet } from './components/AddWallet';
import { useWalletContext } from './store/wallet/walletContext';
import { ShowWallet } from './components/ShowWallet';

function App() {
  const [wcURI, setWcURI] = useState('');
  const [proposal, setProposal] = useState('');
  const [requestSession, setRequestSession] = useState('');
  const [requestEventData, setRequestEventData] = useState('');
  const [successfulSession, setSuccessfulSession] = useState(false);

  const { verifiedWallet } = useWalletContext();

  useInitialization();

  const handleWcURIChange = (event) => {
    setWcURI(event.target.value);
  };

  const handlePairSession = async () => {
    const pairing = await web3WalletPair({ uri: wcURI });

    console.log(pairing);
  };

  const onSessionProposal = useCallback((proposal) => {
    setProposal(proposal);
  }, []);

  const handleAcceptSessionProposal = async () => {
    if (proposal) {
      const { id, params } = proposal;
      const { requiredNamespaces, relays } = params;

      const namespaces = {};

      Object.keys(requiredNamespaces).forEach((key) => {
        const accounts = [];
        requiredNamespaces[key].chains.forEach((chain) => {
          [currentETHAddress].map((acc) => accounts.push(`${chain}:${acc}`));
        });

        namespaces[key] = {
          accounts,
          methods: requiredNamespaces[key].methods,
          events: requiredNamespaces[key].events,
        };
      });

      await web3wallet.approveSession({
        id,
        relayProtocol: relays[0].protocol,
        namespaces,
      });

      setWcURI('');
      setProposal(undefined);
      setSuccessfulSession(true);
    }
  };

  const handleCancelSessionProposal = async () => {
    const { id } = proposal;

    if (proposal) {
      await web3wallet.rejectSession({
        id,
        reason: getSdkError('USER_REJECTED_METHODS'),
      });

      setWcURI('');
      setProposal(undefined);
    }
  };

  const onSessionRequest = useCallback(async (requestEvent) => {
    const { topic, params } = requestEvent;
    const { request } = params;
    const requestSessionData = web3wallet.engine.signClient.session.get(topic);

    switch (request.method) {
      case EIP155_SIGNING_METHODS.ETH_SIGN:
      case EIP155_SIGNING_METHODS.PERSONAL_SIGN:
      case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA:
      case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V3:
      case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V4:
      case EIP155_SIGNING_METHODS.ETH_SIGN_TRANSACTION:
      case EIP155_SIGNING_METHODS.ETH_SEND_TRANSACTION:
        setRequestSession(requestSessionData);
        setRequestEventData(requestEvent);
        return;

      default:
        return;
    }
  }, []);

  const disconnectSessions = async () => {
    const activeSessions = await web3wallet.getActiveSessions();
    const topics = Object.keys(activeSessions);

    if (topics?.length) {
      for (let topicIndex = 0; topicIndex < topics.length; topicIndex++) {
        const topic = topics[topicIndex];

        await web3wallet.disconnectSession({
          topic,
          reason: getSdkError('USER_DISCONNECTED'),
        });
      }
    }
    setSuccessfulSession(false);
  };

  useEffect(() => {
    web3wallet?.on('session_proposal', onSessionProposal);
    web3wallet?.on('session_request', onSessionRequest);
  }, [
    handleAcceptSessionProposal,
    handleCancelSessionProposal,
    currentETHAddress,
    onSessionProposal,
    onSessionRequest,
    successfulSession,
  ]);

  return (
    <>
      {!verifiedWallet ? (
        <AddWallet />
      ) : (
        <ShowWallet />
        // <Container>
        //   <Heading title='Heading' />
        //   <div>
        //     <div>
        //       <p>Network verified Wallet</p>
        //       <p>ETH Address</p>
        //       <p>{currentETHAddress ? currentETHAddress : 'Loading...'}</p>
        //     </div>

        //     <div>
        //       {!successfulSession ? (
        //         <>
        //           <input
        //             placeholder='Enter WC URI (wc:2131...)'
        //             value={wcURI}
        //             onChange={handleWcURIChange}
        //           />

        //           <button onClick={handlePairSession}>Pair Session</button>
        //         </>
        //       ) : (
        //         <button onClick={disconnectSessions}>Disconnect Session</button>
        //       )}
        //     </div>

        //     {proposal && (
        //       <PairingModal
        //         onAccept={handleAcceptSessionProposal}
        //         onCancel={handleCancelSessionProposal}
        //         currentProposal={proposal}
        //       />
        //     )}

        //     <SigningModal
        //       requestEvent={requestEventData}
        //       requestSession={requestSession}
        //       setRequestEvent={setRequestEventData}
        //       setRequestSession={setRequestSession}
        //     />
        //   </div>
        // </Container>
      )}
    </>
  );
}

export default App;
