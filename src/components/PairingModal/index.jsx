import React from 'react';
import { Modal } from '../Modal';
import styles from './styles.module.css';
import { Heading } from '../Heading';
import { Button } from '../Button';

const PairingModal = ({ proposal, onAccept, onCancel }) => {
  if (!proposal) {
    return;
  }
  const name = proposal?.params?.proposer?.metadata?.name;
  const url = proposal?.params?.proposer?.metadata.url;
  const methods = proposal?.params?.requiredNamespaces.eip155.methods;
  const events = proposal?.params?.requiredNamespaces.eip155.events;
  const chains = proposal?.params?.requiredNamespaces.eip155.chains;
  const icon = proposal?.params.proposer.metadata.icons[0];

  return (
    <Modal open>
      <Heading title='Session Proposal' />
      <div className={styles.root}>
        <div className={styles.basicInfoContainer}>
          <img
            src={icon}
            alt={name}
            className={styles.img}
          />

          <div className={styles.nameAndUrlContainer}>
            <label className={styles.name}>{name}</label>
            <a
              href={url}
              target='_blank'
              className={styles.url}
              rel='noreferrer'
            >
              {url}
            </a>
          </div>
        </div>

        <div>
          <p className={styles.heading}>Review eip155 permissions</p>

          <div className={styles.reviewContainer}>
            <label className={styles.heading}>{chains}</label>

            <p className={styles.subHeading}>Methods</p>
            <label className={styles.descriptionText}>
              {methods?.map((method) => method).join(', ')}
            </label>

            <p className={styles.subHeading}>Events</p>
            <label className={styles.descriptionText}>
              {events?.map((event) => event).join(', ')}
            </label>
          </div>
        </div>

        <div className={styles.actionContainer}>
          <Button
            title='Cancel'
            onClick={onCancel}
            variant='error'
          />
          <Button
            title='Approve'
            onClick={onAccept}
            variant='success'
          />
        </div>
      </div>
    </Modal>
  );
};

export default PairingModal;
