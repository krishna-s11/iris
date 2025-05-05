import React from 'react'
import "./tradingTable.css";

const TradingTable = () => {
  return (
    <div className='trading_table'>
        <h1>Trade Histroy</h1>
        <p className='prediction_subtitle'>Live Trading Feed</p>
        <table>
            <tr>
                <th>Asset</th>
                <th>Type</th>
                <th>Enthy Price</th>
                <th>Confidence %</th>
                <th>Status</th>
                <th>P&L</th>
            </tr>
        </table>
    </div>
  )
}

export default TradingTable