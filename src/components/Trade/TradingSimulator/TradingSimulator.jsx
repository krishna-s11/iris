import React, { useState, useEffect, useRef } from "react";
import "./tradingSimulator.css";
import { FaWallet, FaArrowDownUpAcrossLine } from "react-icons/fa6";
import { toast } from "react-toastify";
import axios from "axios";
import Select from "react-select";
import useIsWalletConnected from "../../../hooks/useIsWalletConnected";

const coinsList = [
  { symbol: "BTC", name: "Bitcoin", icon: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png", id: "bitcoin" },
  { symbol: "ETH", name: "Ethereum", icon: "https://assets.coingecko.com/coins/images/279/small/ethereum.png", id: "ethereum" },
  { symbol: "USDC", name: "USD Coin", icon: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png", id: "usd-coin" },
  { symbol: "SOL", name: "Solana", icon: "https://assets.coingecko.com/coins/images/4128/small/solana.png", id: "solana" },
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
  const [fromCoin, setFromCoin] = useState(coinsList.find(c => c.symbol === "USDC"));
  const [toCoin, setToCoin] = useState(coinsList.find(c => c.symbol === "BTC"));
  const [amount, setAmount] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [walletBalance, setWalletBalance] = useState(10000); // example wallet
  const [tradeType, setTradeType] = useState("BUY");
  const isWallet = useIsWalletConnected();

  const [terminalVisible, setTerminalVisible] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState("Executing the trade");
  const [progressDots, setProgressDots] = useState(".");
  const progressInterval = useRef(null);

  const renderCoinLabel = (e) => (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <img src={e.icon} alt={e.name} width={20} height={20} />
      {e.name}
    </div>
  );

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const ids = `${fromCoin.id},${toCoin.id}`;
        const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
        const fromUSD = res.data[fromCoin.id]?.usd;
        const toUSD = res.data[toCoin.id]?.usd;

        if (fromUSD && toUSD) {
          const rate = fromUSD / toUSD;
          setConversionRate(rate);
          if (!isNaN(amount) && amount !== "") {
            setConvertedAmount(parseFloat(amount) * rate);
          }
        }
      } catch (err) {
        console.error("Rate fetch failed", err);
      }
    };

    fetchRate();
  }, [fromCoin, toCoin]);

  const handleAmountChange = (e) => {
    const val = e.target.value;
    setAmount(val);
    if (!isNaN(val) && conversionRate) {
      setConvertedAmount(parseFloat(val) * conversionRate);
    } else {
      setConvertedAmount(0);
    }
  };

  const handleSwap = () => {
    setFromCoin(toCoin);
    setToCoin(fromCoin);
    setAmount("");
    setConvertedAmount(0);
  };

  const handleTrade = async () => {
    if(!isWallet){
      return toast.error("Please connect your wallet to access trading")
    }
    if (!amount || isNaN(amount)) return toast.error("Enter valid amount");
    if (parseFloat(amount) > walletBalance) return toast.error("Insufficient balance");

    setTerminalVisible(true);
    setTerminalOutput("Executing the trade");
    setProgressDots(".");

    // Start typing dots animation
    progressInterval.current = setInterval(() => {
      setProgressDots(prev => (prev.length < 3 ? prev + "." : "."));
    }, 500);

    try {
      const tradePayload = {
        symbol: fromCoin.symbol,
        quantity: parseFloat(amount),
        side: tradeType,
        stop_loss: stopLoss ? parseFloat(stopLoss) : undefined,
      };

      const res = await axios.post("/trade/execute", tradePayload);

      clearInterval(progressInterval.current);
      setTerminalOutput(`✅ ${res.data.message || "Trade executed successfully!"} \n🕒 ${new Date().toLocaleTimeString()}`);
    } catch (err) {
      clearInterval(progressInterval.current);
      setTerminalOutput(`❌ Trade failed. Please try again.\n🕒 ${new Date().toLocaleTimeString()}`);
    }
  };

  const handleCancelTrade = () => {
    clearInterval(progressInterval.current);
    setTerminalOutput("⛔ Trade cancelled by user.");
  };

  return (
    <div className="trade_card">
      <div className="trade_top">
        <h2 className="trade_heading">Trading Simulator</h2>
        <div className="wallet_card">
          <FaWallet className="wallet_icon" />
          <div>
            <p className="wallet_label">Wallet</p>
            <p className="wallet_balance">${walletBalance.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="trade_toggle">
        <button className={`toggle_button ${tradeType === "BUY" ? "active" : ""}`} onClick={() => setTradeType("BUY")}>Buy</button>
        <button className={`toggle_button ${tradeType === "SELL" ? "active" : ""}`} onClick={() => setTradeType("SELL")}>Sell</button>
      </div>

      <div className="swap_section">
        <div className="swap_box">
          <p className="swap_label">You Pay</p>
          <input className="login_input" type="number" placeholder="0" value={amount} onChange={handleAmountChange} />

          <Select className="react_select" value={fromCoin} onChange={setFromCoin} options={[coinsList.find(c => c.symbol === "USDC")]} getOptionLabel={renderCoinLabel} styles={customStyles} />
        </div>

        <div className="swap_button_wrapper">
          <button className="swap_button" onClick={handleSwap}>
            <FaArrowDownUpAcrossLine />
          </button>
        </div>

        <div className="swap_box">
          <p className="swap_label">You Receive</p>
          <input className="login_input" placeholder="0" value={isNaN(convertedAmount) ? "0" : convertedAmount.toFixed(6)} readOnly />
          <Select className="react_select" value={toCoin} onChange={setToCoin} options={coinsList} getOptionLabel={renderCoinLabel} styles={customStyles} />
        </div>
      </div>
    <p className="swap_label" style={{ marginTop: '15px' }}>Optional: Stop Loss</p>
          <input className="login_input" type="number" placeholder="Set stop loss (e.g., 19000)" value={stopLoss} onChange={(e) => setStopLoss(e.target.value)} />

      <button className="btn_signIn trade_button" onClick={handleTrade}>
        {tradeType === "BUY" ? "Buy" : "Sell"}
      </button>

      {terminalVisible && (
        <div style={{
          marginTop: "30px",
          backgroundColor: "#111",
          color: "#0f0",
          fontFamily: "monospace",
          fontSize: "14px",
          padding: "15px",
          borderRadius: "10px",
          whiteSpace: "pre-wrap",
          border: "1px solid #444",
          position: "relative"
        }}>
          <div>{terminalOutput}{progressDots}</div>
          <button
            onClick={handleCancelTrade}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "#EF4444",
              border: "none",
              padding: "5px 10px",
              color: "#fff",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default TradingSimulator;
