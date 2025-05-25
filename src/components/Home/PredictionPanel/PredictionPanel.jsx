import React from 'react'
import "./predictionPanel.css";
import progressbar from "../../../assets/progressbar.svg";

const PredictionPanel = ({logo,name,confidence,signal,direction}) => {
  return (
    <div className='predictionPanel'>
        <h1>{name}</h1>
        <p className="prediction_subtitle">Iris Prediction</p>
        <div className='progress_holder'>
            <img src={progressbar} alt="" srcset="" id="progress_img"/>
            <img src={logo} alt="" srcset="" id="prediction_btc"/>
        </div>
        <div className='prediction_content'>
            <div>
                <h2>{signal}</h2>
                <p>Signal </p>
            </div>
            <div style={{marginRight:"10px"}}>
                <h1 className='confidence_text' style={{fontSize: "20px"}}>{confidence}</h1>
                <p>Condidence %</p>
            </div>
            <div>
                <h2 style={{color: "#01B574"}}>{direction}</h2>
                <p>Direction</p>
            </div>
        </div>
    </div>
  )
}

export default PredictionPanel