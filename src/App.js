import React, {useEffect, useState} from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/wave.json"

export default function App() {

  // Variable where we can store our account
  const [currentAccount, setCurrentAccount] = useState("");
  const [totalWaveCount, setTotalWaveCount] = useState('')
  const [allWaves, setAllWaves] = useState([]);
  const [singleUserWaves, setSingleUserWaves] = useState(0)

  const contractAddress = "0x22A45558582cd3d7a27fD7a2c05E6DC48E164FeB"
  const contractAbi = abi.abi;


  // Check if wallet is connected
  const checkIfWalletIsConnect = async () => {

   try {

    const { ethereum } = window

    if(!ethereum) {
      console.log('Make Sure you have metamask');
      return;
    }else{
      console.log("We have ethereum Object", ethereum);
    }


   } catch(err) {
    console.log(err)
   }

  }

  /**
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {

    try {

      const {ethereum} = window

      if(!ethereum) {
        alert("Make sure you have metamask or ethereum client")
      } else{
        const accounts = await ethereum.request({method: "eth_accounts"});

        if(accounts.length !== 0){

          const account = accounts[0];
          console.log("There is an authorized account:", account);
          setCurrentAccount(account)

          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner();

          const wavePortalContract = new ethers.Contract(contractAddress,contractAbi,signer);

          let count = await wavePortalContract.getTotalWaves();
          console.log("Total count: ", count.toNumber())
          setTotalWaveCount(count.toNumber());

          await getAllWaves()
          await getAllWaveResultFromSingleUser(account)

        }else{
          console.log("No Authorized Account")
        }

      }

      console.log('connected')
    }catch(err) {
      console.log(err)
    }

  }


  useEffect( () => {
    checkIfWalletIsConnect();
  }, [])


  const wave = async () => {
    try {
      const {ethereum} = window

      if(!ethereum) {
        console.log("You need metamask")
      }else{

        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner();

        const wavePortalContract = new ethers.Contract(contractAddress,contractAbi,signer);

        let count = await wavePortalContract.getTotalWaves();

        const waveTx = await wavePortalContract.wave('What is life', {gasLimit: 300000});
        console.log("mining trx: ", waveTx.hash)

        await waveTx.wait()
        console.log("Mined -- ", waveTx.hash)

        count = await wavePortalContract.getTotalWaves()
        console.log("Total count: ", count.toNumber())
        setTotalWaveCount(count.toNumber());

        await getAllWaves()

      }

      console.log("waved")
    } catch (err) {
      console.log(err)
    }
  }

  const getAllWaves = async () => {

    try {

      const {ethereum} = window

      if(ethereum) {
        // Get Provider
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const wavePortalContract = new ethers.Contract(contractAddress, contractAbi, signer )

        // Calls the web provider
        const waves = await wavePortalContract.getAllWaves()

        console.log(waves)

        let wavesCleaned = []
        waves.forEach(wave => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message
          })
        })

        // Data Stored in React
        setAllWaves(wavesCleaned)

      }else{
        console.log("Ethereum no exist")
      }

    } catch (error) {
      console.log(error)
    }


  }

  const getAllWaveResultFromSingleUser = async (_account) => {
    try {

      const {ethereum} = window

      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress,contractAbi,signer);

        // Call the wave amount giving the address of the signer
        const amountOfWaves = await wavePortalContract.userStatus(_account)

        console.log(wavePortalContract)

        setSingleUserWaves(amountOfWaves.toNumber())

      }else{
        alert("You need metamask")
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mainContainer">

      <div className="dataContainer">

        <div className="header">
        👋 Hey whats up hello
        </div>

        <div className="bio">
        I am lyub, just trying to get through life. teach me, help me, be my friend.
        </div>

        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect
          </button>
        )}

        {/* Loading section */}

        {currentAccount && (
          <div className="status">
            <h2>Amount of Waves</h2>
            <h3>Account: {currentAccount}</h3>
            <p>
              {totalWaveCount}
            </p>
            <p>
              {singleUserWaves}
            </p>
            <button className="waveButton" onClick={wave}>
              Wave at Me
            </button>
          </div>
        )}

        {allWaves.map((wave, index) => {
          return (
            <div key={index} className="wavesMessageData" >
              <div>Address: {wave.address}</div>
              <div>Time: {wave.timestamp.toString()}</div>
              <div>Message: {wave.message}</div>
            </div>)
        })}

      </div>

    </div>
  );
}