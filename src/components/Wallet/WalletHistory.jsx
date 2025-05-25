import React from 'react';
import './walletHistory.css';

const WalletHistory = ({ transactions, isWalletConnected }) => {
  const noTransactions = !transactions || transactions.length === 0;

  return (
    <div className='wallet_history'>
      <h1>Wallet History</h1>
      <p className='prediction_subtitle'>Your Binance Transaction Logs</p>

      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Amount ($)</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {!isWalletConnected ? (
            <tr>
              <td colSpan="3" style={{ padding: "15px", color: "#CBD5E0", fontSize: "14px" }}>
                Connect your wallet to view transaction history.
              </td>
            </tr>
          ) : noTransactions ? (
            <tr>
              <td colSpan="3" style={{ padding: "15px", color: "#CBD5E0", fontSize: "14px" }}>
                No transactions yet.
              </td>
            </tr>
          ) : (
            transactions.map((tx, index) => (
              <tr key={index}>
                <td>{tx.datetime}</td>
                <td>{tx.amount.toFixed(2)}</td>
                <td>{tx.type}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WalletHistory;
