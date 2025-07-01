import React from 'react'
import "./tradingTable.css";

const TradingTable = () => {
  return (
    <div className='trading_table'>
        <h1>Trade Histroy</h1>
        <p className='prediction_subtitle'>Live Trading Feed</p>
        <table>
            {/* <tr>
                <th>Asset</th>
                <th>Type</th>
                <th>Entry Price</th>
                <th>Confidence %</th>
                <th>Status</th>
                <th>P&L</th>
            </tr> */}
            <tr>
              <td>Bitcoin</td>
              <td>Payment</td>
              <td>$94708</td>
              <td>92%</td>
              <td style={{color: "#01B574"}}>Live</td>
              <td style={{color: "#E31A1A"}}>-0.003%</td>
            </tr>
            <tr>
              <td>Ethereum</td>
              <td>Payment</td>
              <td>$1322</td>
              <td>89%</td>
              <td style={{color: "#E31A1A"}}>Settled</td>
              <td style={{color: "#01B574"}}>+23.13%</td>
            </tr>
            <p style={{marginLeft: "10px", marginTop: "10px", fontSize: "14px", marginBottom: "100px"}}></p>
        </table>
    </div>
  )
}

export default TradingTable