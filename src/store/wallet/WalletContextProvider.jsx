import React, { useState } from 'react';
import { WalletContext } from './walletContext';

export const WalletContextProvider = ({ children }) => {
  const [walletData, setWalletData] = useState({
    verifiedWallet: null,
    ethAddress: '',
  });

  const handleSetVerifiedWallet = (verifiedWallet) => {
    setWalletData((data) => ({ ...data, verifiedWallet }));
  };

  const handleSetEthAddress = (address) => {
    setWalletData((data) => ({ ...data, ethAddress: address }));
  };

  return (
    <WalletContext.Provider
      value={{
        ...walletData,
        setVerifiedWallet: handleSetVerifiedWallet,
        setEthAddress: handleSetEthAddress,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
