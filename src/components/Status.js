import React from 'react'

function Status({isAccount, waveCount ,singleWaveCount, deWaves }) {
  return (
    <div className='status'>
      <header>
        <h3>Account: {isAccount}</h3>
        <p>
          Total Contract Waves: {waveCount}
        </p>
        <p>
          Total Waves From You: {singleWaveCount}
        </p>
      </header>
      <div className='messages'>
        {
          deWaves.map((wave, index) => {
            return (
              <div key={index} className="wavesMessageData">
                <h2>Address: {wave.address}</h2>
                <h3>Time: {wave.timestamp.toString()}</h3>
                <p>Message: {wave.message}</p>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default Status