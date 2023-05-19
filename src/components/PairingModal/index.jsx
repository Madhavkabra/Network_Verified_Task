import React from 'react';

const PairingModal = ({ currentProposal, onAccept, onCancel }) => {
  const name = currentProposal?.params?.proposer?.metadata?.name;
  const url = currentProposal?.params?.proposer?.metadata.url;
  const methods = currentProposal?.params?.requiredNamespaces.eip155.methods;
  const events = currentProposal?.params?.requiredNamespaces.eip155.events;
  const chains = currentProposal?.params?.requiredNamespaces.eip155.chains;
  const icon = currentProposal?.params.proposer.metadata.icons[0];

  return (
    <div>
      <div>
        <img
          src={icon}
          alt={name}
        />
      </div>

      <div>
        <p>{name}</p>
        <p>{url}</p>
        <p>Chains: {chains}</p>

        {methods?.map((method) => (
          <p key={method}>{method}</p>
        ))}

        {events?.map((event) => (
          <p key={event}>{event}</p>
        ))}
      </div>

      <div>
        <button onClick={onAccept}>Accept</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default PairingModal;
