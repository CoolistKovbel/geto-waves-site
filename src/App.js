import React, {useEffect, useState} from "react";
import { ethers } from "ethers";


export default function App () {

  // State Variables
  const [currentAccount, setCurrentAccount] = useState("");
  const [validAccount, setValidAccount] = useState(false);


  const checkIfWalletIsConnect = async () => {
    try {
      // Make sure we have access to window.ethereum
      const {ethereum} = window

      if(!ethereum){
        alert("Get metamask")
      } else {
        console.log("Ethereum object exists: ", ethereum)
      }

      // Check to if authorized User
      const accounts = await ethereum.request({method: "eth_accounts"});

      if(accounts.length !== 0) {
        const account = accounts[0];
        console.log("Authorized account: ", account)
        setValidAccount(true)
        setCurrentAccount(account)
      } else {
        console.log("no authorized account")
      }
    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    checkIfWalletIsConnect()
  },[])


  return (
    <div>
      <h2>Welcome to the Geto Wave App</h2>
      <div>
        <h2>Profile Account: {currentAccount}</h2>
      </div>
      <button className="waveButton" onClick={null}>
          Wave at Me
      </button>

    </div>
  )
}