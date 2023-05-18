import React from 'react';

import { VerifiedWallet } from '@verified-network/verified-sdk';

export const VerifiedNetworkWallet = () => {
  const importMnemonicsWallet = async () => {
    const mnemonics = await VerifiedWallet.generateMnemonic();
    const wallet = VerifiedWallet.importWallet(mnemonics);

    console.log(wallet);
  };

  const createWallet = async () => {
    const wallet = VerifiedWallet.createWallet();

    console.log(wallet);
  };

  return (
    <div>
      <button onClick={importMnemonicsWallet}>Import Mnemonics Wallet</button>
      <button onClick={createWallet}>Create Wallet</button>
    </div>
  );
};
