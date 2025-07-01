import React, { useEffect, useRef, useState } from 'react';
import './dashbot.css';
import { RiRobot3Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

const hardcodedAnswers = [
  `**Analyzing on-chain and off-chain data…**\n\nIn the last 24 hours:\n• Bitcoin is showing increased whale activity, particularly between $58 k–$60 k.\n• Ether liquidity in DeFi pools rose by 8%, indicating growing staking or lending interest.\n• Social sentiment on X/Twitter has shifted positive (Sentiment Score +0.23).\n\n**Consider:**\n- Long BTC on dips below $59 k with a tight stop-loss\n- ETH DeFi surge could signal breakout. Monitoring for entry...`,

  `**ETH Dominance Shift Predicted**\n\nModel suggests >2% change around July 2–3 from rising DeFi on Polygon & Arbitrum.\n\n**Autonomous Strategy:**\n1. Long ETH/USDC (up to 1% of portfolio)\n2. TP at +5% and +10%\n3. SL if ETH dominance < 16.5%\n\nShall I proceed?`,

  `✅ **Strategy activated.** Monitoring conditions and will execute per your risk profile. You’ll receive real-time updates on execution and performance.`,

  `**SOL Position Review:**\n- Stop-loss triggered at –5%, emergency threshold untouched.\n\n**Suggested Actions:**\nA. Rebalance: Shift 3% SOL to USDC\nB. Hedge: Open 2% SOL short\nC. Dip-buy: Re-enter < $95\n\nWhich option shall I take?`,

  `👍 Understood:\n- Hedging 2% via perpetuals\n- Buy alert set for SOL < $95\n\nYou’ll get notified upon execution or trigger.`
];

const Dashbot = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! Ask me anything.' }
  ]);
  const [input, setInput] = useState('');
  const [answerIndex, setAnswerIndex] = useState(0);
  const chatContainerRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    const botMessage = {
      from: 'bot',
      text: hardcodedAnswers[answerIndex % hardcodedAnswers.length]
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setInput('');
    setAnswerIndex(prev => prev + 1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  // Auto-scroll on message change
  useEffect(() => {
  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }
}, [messages]);

  // Markdown → HTML formatter
  const renderMessageText = (text) => {
    const withLineBreaks = text.replace(/\n/g, '<br/>');
    const withBullets = withLineBreaks.replace(/•\s/g, '•&nbsp;');
    const withBold = withBullets.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    const withCheck = withBold.replace(/✅/g, '✅').replace(/👍/g, '👍');
    return <span dangerouslySetInnerHTML={{ __html: withCheck }} />;
  };

  return (
    <div className="dashbot_card">
      <h1 style={{ marginBottom: "30px" }}>Iris AI Assistant</h1>
      <div
  className="chat_thread" ref={chatContainerRef} style={{ paddingBottom: "20px" }}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat_row ${msg.from}`} style={{ display: "flex", alignItems: "center" }}>
            <div style={{
              width: '30px',
              height: "30px",
              backgroundColor: "#805AD5",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              {msg.from === 'bot' ? <RiRobot3Fill /> : <FaUser />}
            </div>
            <div className="chat_bubble">{renderMessageText(msg.text)}</div>
          </div>
        ))}
      </div>
      <div className="chat_input_row">
        <input
          type="text"
          placeholder="Ask your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Dashbot;
