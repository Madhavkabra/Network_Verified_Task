import {
  formatJsonRpcError,
  formatJsonRpcResult,
} from '@walletconnect/jsonrpc-utils';
import { getSdkError } from '@walletconnect/utils';
import { Provider } from '@verified-network/verified-sdk';

import { getSignParamsMessage, getSignTypedDataParamsData } from './helpers';
import { EIP155_SIGNING_METHODS } from './eip155Lib';

export const approveEIP155Request = async (wallet, requestEvent) => {
  const { params, id } = requestEvent;
  const { request } = params;

  switch (request.method) {
    case EIP155_SIGNING_METHODS.PERSONAL_SIGN:
    case EIP155_SIGNING_METHODS.ETH_SIGN:
      const message = getSignParamsMessage(request.params);
      const signedMessage = await wallet.signMessage(message);
      return formatJsonRpcResult(id, signedMessage);

    case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA:
    case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V3:
    case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V4:
      const {
        domain,
        types,
        message: data,
      } = getSignTypedDataParamsData(request.params);

      delete types.EIP712Domain;

      const signedData = await wallet._signTypedData(domain, types, data);
      return formatJsonRpcResult(id, signedData);

    case EIP155_SIGNING_METHODS.ETH_SEND_TRANSACTION:
      const defaultProvider =
        'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';

      const provider = Provider.defaultProvider(defaultProvider);
      const sendTransaction = request.params[0];
      const connectedWallet = wallet.connect(provider);

      try {
        const { hash } = await connectedWallet.sendTransaction(sendTransaction);
        return formatJsonRpcResult(id, hash);
      } catch (error) {
        alert(error.message);
        return formatJsonRpcError(id, error.message);
      }

    case EIP155_SIGNING_METHODS.ETH_SIGN_TRANSACTION:
      const signTransaction = request.params[0];
      const signature = await wallet.signTransaction(signTransaction);
      return formatJsonRpcResult(id, signature);

    default:
      throw new Error(getSdkError('INVALID_METHOD').message);
  }
};

export const rejectEIP155Request = (request) => {
  const { id } = request;

  return formatJsonRpcError(id, getSdkError('USER_REJECTED_METHODS').message);
};
