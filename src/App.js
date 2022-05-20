import * as React from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {

  const wave = () => {

  }

  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Hey whats up hello
        </div>

        <div className="bio">
        I am lyub, just trying to get through life. teach me help me be my friend.
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
      </div>

    </div>
  );
}
