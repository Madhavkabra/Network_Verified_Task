import React from 'react';
import {
  approveEIP155Request,
  rejectEIP155Request,
} from '../../services/walletConnect/web3wallet/eip155Requests';
import { web3wallet } from '../../services/walletConnect/web3wallet/walletConnectUtils';
import { getSignParamsMessage } from '../../services/walletConnect/web3wallet/helpers';

const SigningModal = ({
  requestSession,
  requestEvent,
  setRequestSession,
  setRequestEvent,
}) => {
  if (!requestEvent || !requestSession) return null;

  const chainID = requestEvent?.params?.chainId?.toUpperCase();
  const method = requestEvent?.params?.request?.method;
  const message = getSignParamsMessage(requestEvent?.params?.request?.params);

  const requestName = requestSession?.peer?.metadata?.name;
  const requestIcon = requestSession?.peer?.metadata?.icons[0];
  const requestURL = requestSession?.peer?.metadata?.url;

  const { topic } = requestEvent;

  const onApprove = async () => {
    if (requestEvent) {
      const response = await approveEIP155Request(requestEvent);
      await web3wallet.respondSessionRequest({
        topic,
        response,
      });

      setRequestSession('');
      setRequestEvent('');
    }
  };

  const onReject = async () => {
    if (requestEvent) {
      const response = rejectEIP155Request(requestEvent);
      await web3wallet.respondSessionRequest({
        topic,
        response,
      });

      setRequestSession('');
      setRequestEvent('');
    }
  };

  return (
    <div>
      <div>
        <img
          src={requestIcon}
          alt={requestName}
        />
      </div>

      <div>
        <p>{requestName}</p>
        <p>{requestURL}</p>
        <p>{message}</p>
        <p>Chains: {chainID}</p>

        <p>{method}</p>
      </div>

      <div>
        <button onClick={onApprove}>Accept</button>
        <button onClick={onReject}>Cancel</button>
      </div>
    </div>
  );
};

export default SigningModal;
