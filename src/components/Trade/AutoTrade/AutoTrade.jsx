import React, { useState } from "react";
import "./autoTrade.css";
import { toast } from "react-toastify";

const AutoTrade = () => {
  const [isAutoTradeOn, setIsAutoTradeOn] = useState(false);
  const [riskValue, setRiskValue] = useState(10);

  const handleSubmit = () => {
    toast.success(`Auto-trade ${isAutoTradeOn ? "enabled" : "disabled"} with risk ${riskValue}%`);
    // You can send POST/PUT here via axios if needed
  };

  return (
    <div className="auto_trade_card">
      <h2 className="auto_trade_title">Auto Trade</h2>

      <div className="auto_toggle_section">
        <label className="toggle_label">Turn on Autotrade</label>
        <label className="switch_trade">
          <input
            type="checkbox"
            checked={isAutoTradeOn}
            onChange={() => setIsAutoTradeOn(!isAutoTradeOn)}
          />
          <span className="slider round"></span>
        </label>
      </div>

      <div className="risk_section">
        <label className="risk_label">Risk Allowed (%)</label>
        <div className="risk_input_group">
          <input
            type="range"
            min="0"
            max="100"
            value={riskValue}
            onChange={(e) => setRiskValue(e.target.value)}
            className="risk_slider"
          />
          <input
            type="number"
            value={riskValue}
            min="0"
            max="100"
            className="risk_number"
            onChange={(e) => setRiskValue(e.target.value)}
          />
        </div>
      </div>

      <button className="btn_signIn auto_trade_button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default AutoTrade;
