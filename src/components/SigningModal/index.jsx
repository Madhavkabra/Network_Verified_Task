import React from 'react';
import {
  approveEIP155Request,
  rejectEIP155Request,
} from '../../services/walletConnect/web3wallet/eip155Requests';
import { web3wallet } from '../../services/walletConnect/web3wallet/walletConnectUtils';
import { getSignParamsMessage } from '../../services/walletConnect/web3wallet/helpers';
import { Modal } from '../Modal';
import { Heading } from '../Heading';
import styles from './styles.module.css';
import { Button } from '../Button';
import { useWalletContext } from '../../store/wallet';
import { isJson } from '../../utils/helper';
import { EIP155_SIGNING_NAME } from '../../services/walletConnect/web3wallet/eip155Lib';

const SigningModal = ({
  requestSession,
  requestEvent,
  setRequestSession,
  setRequestEvent,
}) => {
  const { verifiedWallet } = useWalletContext();

  if (!requestEvent || !requestSession) return null;

  const chainID = requestEvent?.params?.chainId?.toUpperCase();
  const method = requestEvent?.params?.request?.method;
  const message = getSignParamsMessage(requestEvent?.params?.request?.params);

  // Format message data based on data-type
  const formattedMessage = isJson(message)
    ? typeof message === 'object'
      ? JSON.stringify(message, null, 2)
      : JSON.stringify(JSON.parse(message), null, 2)
    : message;

  const requestName = requestSession?.peer?.metadata?.name;
  const requestIcon = requestSession?.peer?.metadata?.icons[0];
  const requestURL = requestSession?.peer?.metadata?.url;
  const requestProtocol = requestSession?.relay?.protocol;

  const { topic } = requestEvent;

  const onApprove = async () => {
    if (requestEvent) {
      const response = await approveEIP155Request(verifiedWallet, requestEvent);
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
    <Modal open>
      <Heading title={EIP155_SIGNING_NAME[method]} />

      <div className={styles.root}>
        <div className={styles.basicInfoContainer}>
          <img
            src={requestIcon}
            alt={requestName}
            className={styles.img}
          />

          <div className={styles.nameAndUrlContainer}>
            <label className={styles.name}>{requestName}</label>
            <a
              href={requestURL}
              target='_blank'
              className={styles.url}
              rel='noreferrer'
            >
              {requestURL}
            </a>
          </div>
        </div>

        <div className={styles.infoSection}>
          <div>
            <p className={styles.heading}>Data</p>

            <div className={styles.reviewContainer}>
              <pre className={styles.data}>{formattedMessage}</pre>
            </div>
          </div>

          <div>
            <p className={styles.heading}>Extra Information</p>

            <div className={styles.reviewContainer}>
              <p className={styles.heading}>Blockchain</p>
              <label className={styles.descriptionText}>{chainID}</label>

              <p className={styles.heading}>Methods</p>
              <label className={styles.descriptionText}>{method}</label>

              <p className={styles.heading}>Relay Protocol</p>
              <label className={styles.descriptionText}>
                {requestProtocol}
              </label>
            </div>
          </div>
        </div>

        <div className={styles.actionContainer}>
          <Button
            title='Approve'
            onClick={onApprove}
            variant='success'
          />
          <Button
            title='Reject'
            onClick={onReject}
            variant='error'
          />
        </div>
      </div>
    </Modal>
  );
};

export default SigningModal;
