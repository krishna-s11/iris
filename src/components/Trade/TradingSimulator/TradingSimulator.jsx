import React, { useEffect, useState } from "react";
import "./tradingSimulator.css";
import { FaWallet, FaArrowDownUpAcrossLine } from "react-icons/fa6";
import { toast } from "react-toastify";
import axios from "axios";
import Select from "react-select";

const coinsList = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    icon: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    icon: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    icon: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
  },
  {
    symbol: "SOL",
    name: "Solana",
    icon: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
  },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    background: "rgba(255, 255, 255, 0.05)",
    border: "2px solid #99C8FF",
    borderRadius: "20px",
    height: "50px",
    color: "#fff",
    fontSize: "16px",
    paddingLeft: "8px",
    backdropFilter: "blur(10px)",
  }),
  singleValue: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    color: "#fff",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#1A202C",
    zIndex: 10,
  }),
  option: (provided, state) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    color: "#fff",
    backgroundColor: state.isFocused ? "#2D3748" : "transparent",
    cursor: "pointer",
  }),
};

const TradingSimulator = () => {
  const [fromCoin, setFromCoin] = useState(coinsList[0]);
  const [toCoin, setToCoin] = useState(coinsList[2]);
  const [amount, setAmount] = useState("");
  const [prices, setPrices] = useState({});
  const [walletBalance, setWalletBalance] = useState(3000);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [tradeType, setTradeType] = useState("BUY");
  
  const fetchPrices = async () => {
    try {
      const ids = coinsList.map((coin) => coin.name.toLowerCase()).join(",");
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
      );
      const result = {};
      coinsList.forEach((coin) => {
        result[coin.symbol] = res.data[coin.name.toLowerCase()];
      });
      setPrices(result);
      console.log(result);
    } catch (err) {
      toast.error("Failed to fetch prices");
    }
  };

  useEffect(() => {
    fetchPrices(); 
    const interval = setInterval(fetchPrices, 10000); 
    return () => clearInterval(interval);
    }, []);

    useEffect(() => {
    if (prices[fromCoin.symbol] && prices[toCoin.symbol] && amount) {
        const fromPrice = prices[fromCoin.symbol]?.usd || 0;
        const toPrice = prices[toCoin.symbol]?.usd || 0;
        const result = (amount * fromPrice) / toPrice;
        setConvertedAmount(result);
    } else {
        setConvertedAmount(0);
    }
    }, [amount, fromCoin, toCoin, prices]);


  const handleSwap = () => {
    setFromCoin(toCoin);
    setToCoin(fromCoin);
    setAmount("");
    setConvertedAmount(0);
  };

  const handleTrade = async () => {
    if (!amount || isNaN(amount)) {
      return toast.error("Please enter a valid amount");
    }

    if (parseFloat(amount) > walletBalance) {
      return toast.error("Insufficient balance");
    }

    try {
      const tradePayload = {
        symbol: fromCoin.symbol,
        quantity: parseFloat(amount),
        side: "BUY",
        api_key: "your_api_key_here",
        secret_key: "your_secret_key_here",
      };

      await axios.post("/api/trade", tradePayload);
      toast.success("Trade executed successfully!");
    } catch (err) {
      toast.error("Trade failed. Please try again.");
    }
  };

  return (
    <div className="trade_card">
      <div className="trade_top">
        <h2 className="trade_heading">Trading Simulator</h2>
        <div className="wallet_card">
            <FaWallet className="wallet_icon" />
            <div>
            <p className="wallet_label">Wallet</p>
            <p className="wallet_balance">${walletBalance}</p>
            </div>
        </div>
      </div>
      <div className="trade_toggle">
        <button
            className={`toggle_button ${tradeType === "BUY" ? "active" : ""}`}
            onClick={() => setTradeType("BUY")}
        >
            Buy
        </button>
        <button
            className={`toggle_button ${tradeType === "SELL" ? "active" : ""}`}
            onClick={() => setTradeType("SELL")}
        >
            Sell
        </button>
        </div>
      <div className="swap_section">
        <div className="swap_box">
          <p className="swap_label">You Pay</p>
          {prices[fromCoin] && prices[toCoin] && (
            <p className="conversion_rate">
                1 {fromCoin} ≈ {(prices[fromCoin].usd / prices[toCoin].usd).toFixed(4)} {toCoin}
            </p>
            )}
          <input
            className="login_input"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            />
          <Select
            className="react_select"
            value={fromCoin}
            onChange={setFromCoin}
            options={coinsList}
            getOptionLabel={(e) => (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img src={e.icon} alt="" width={20} height={20} />
                {e.name}
              </div>
            )}
            styles={customStyles}
          />
        </div>

        <div className="swap_button_wrapper">
          <button className="swap_button" onClick={handleSwap}>
            <FaArrowDownUpAcrossLine />
          </button>
        </div>

        <div className="swap_box">
          <p className="swap_label">You Receive</p>
          <input
            className="login_input"
            placeholder="0"
            value={convertedAmount.toFixed(4)}
            readOnly
            />
          <Select
            className="react_select"
            value={toCoin}
            onChange={setToCoin}
            options={coinsList}
            getOptionLabel={(e) => (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img src={e.icon} alt="" width={20} height={20} />
                {e.name}
              </div>
            )}
            styles={customStyles}
          />
        </div>
      </div>

      <button className="btn_signIn trade_button" onClick={handleTrade}>
        Buy
      </button>
    </div>
  );
};

export default TradingSimulator;
