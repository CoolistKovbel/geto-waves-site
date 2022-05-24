import React, {useEffect, useState} from "react";
import { ethers } from "ethers";


export default function App () {

  const checkIfWalletIsConnect = () => {
    // Make sure we have access to window.ethereum
    const {ethereum} = window

    if(!ethereum){
      alert("Get metmask")
    } else {
      console.log("Ethereum object exists: ", ethereum)
    }

  }

  useEffect(() => {
    checkIfWalletIsConnect()
  },[])


  return (
    <div>
      <h2>Welcome to the Geto Wave App</h2>
      <button className="waveButton" onClick={null}>
          Wave at Me
      </button>

    </div>
  )
}