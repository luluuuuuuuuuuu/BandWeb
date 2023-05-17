import React from 'react'
import './Titles.css';

function Titles() {
  return (
    <div className='titles'>
        <div className='band-title'>
            <img src={require("./New Project (18).png")} alt="band-title" className='Band-title'/>
        </div>
        <div className='tour'>
            <img src={require("./New Project (19).png")} alt="tour" className='tour'/>
        </div>
    </div>
  )
}

export default Titles