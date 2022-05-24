import React from 'react'

function Bio({isAccount, waveButton, deMessage, handleChange}) {

  const handChange = e => {
    const {value} = e.target
    handleChange(value)
  }

  return (
    <div className='bio'>

      <div className='img-container'>
        <img
        src="https://i.pinimg.com/originals/69/f6/01/69f6010377ca4057293071ceea834c88.jpg"
        alt="random profile" />
      </div>

      <div className='bio-content'>
        <p>
          Hey I am lyub. Just a dude trying to do some cool things I guess. Learning to be someone cool so I hope my girlfriend can relax and I can code more and more and who knows make something cool, get my friends back, get my life back, make at least 50k and out perform elon musk.
        </p>
        <p>
          Soon To create more projects so... stay tuned..
        </p>

        <ul>
          <li>NFT Collection</li>
          <li>DEFI Application</li>
          <li>Crypto Currency</li>
        </ul>

        <button className={isAccount ? "yes" : "no"} onClick={waveButton}>
          Wave at Me
        </button>

        <input
          className={isAccount ? "yes" : "no"}
          type="text"
          onChange={handChange}
          name="message"
          value={deMessage}
          />

      </div>


    </div>
  )
}

export default Bio