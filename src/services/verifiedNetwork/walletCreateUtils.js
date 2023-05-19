import { VerifiedWallet } from '@verified-network/verified-sdk';

export let verifiedWallet;

export const createWallet = async () => {
  const wallet = VerifiedWallet.createWallet();

  verifiedWallet = wallet;

  return { wallet, address: wallet.address };
};
