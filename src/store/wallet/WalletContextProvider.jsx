import React, { useState } from 'react';
import { WalletContext } from './walletContext';

export const WalletContextProvider = ({ children }) => {
  const [wallet, setWallet] = useState();

  const handleSetVerifiedWallet = (verifiedWallet) => {
    setWallet(verifiedWallet);
  };

  return (
    <WalletContext.Provider
      value={{
        verifiedWallet: wallet,
        setVerifiedWallet: handleSetVerifiedWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
