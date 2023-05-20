import { getSdkError } from '@walletconnect/utils';
import { web3wallet } from '../services/walletConnect/web3wallet/walletConnectUtils';
import { useCallback } from 'react';

export const useSessionDisconnect = ({ setSuccessfulSession }) => {
  const disconnectSessions = useCallback(async () => {
    const activeSessions = await web3wallet.getActiveSessions();
    const topic = Object.keys(activeSessions)[0];

    if (topic) {
      await web3wallet.disconnectSession({
        topic,
        reason: getSdkError('USER_DISCONNECTED'),
      });
    }
    setSuccessfulSession(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { disconnectSessions };
};
