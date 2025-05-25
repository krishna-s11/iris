// src/hooks/useIsWalletConnected.js
import { useWallet } from "../contexts/WalletContext";

const useIsWalletConnected = () => {
  const { walletInfo } = useWallet();
  console.log("walletInfo", walletInfo);
  return !!(walletInfo?.binance_api_key && walletInfo?.binance_api_secret);
};

export default useIsWalletConnected;
