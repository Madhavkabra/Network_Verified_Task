import { createContext, useContext } from 'react';

export const WalletContext = createContext({
  verifiedWallet: null,
  setVerifiedWallet: () => {},
});

export const useWalletContext = () => {
  return useContext(WalletContext);
};
