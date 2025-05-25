import React, { createContext, useContext, useState, useEffect } from "react";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletInfo, setWalletInfo] = useState({
    binance_api_key: null,
    binance_api_secret: null,
  });

  // ✅ Update context + persist to localStorage
  const updateWalletInfo = (key, secret) => {
    const info = {
      binance_api_key: key,
      binance_api_secret: secret,
    };
    setWalletInfo(info);

    // Save to localStorage for hydration
    localStorage.setItem("binance_api_key", key);
    localStorage.setItem("binance_api_secret", secret);
  };

  // ✅ Hydrate context from localStorage on first load
  useEffect(() => {
    const storedKey = localStorage.getItem("binance_api_key");
    const storedSecret = localStorage.getItem("binance_api_secret");

    if (storedKey && storedSecret) {
      setWalletInfo({
        binance_api_key: storedKey,
        binance_api_secret: storedSecret,
      });
    }
  }, []);

  return (
    <WalletContext.Provider value={{ walletInfo, updateWalletInfo }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
