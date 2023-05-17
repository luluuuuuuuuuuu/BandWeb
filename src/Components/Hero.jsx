import React from 'react';
import './Hero.css';


function Hero() {
  return (
    <div class="hero-section">
      <div className='hero-content'>
        <img src={require("./New Project (17).png")} alt="Hero-content" className='Hero-image'/>
        <button className='hero-button'><a href="https://arcticmonkeys.ffm.to/thecar">STREAM NOW</a></button>
      </div>
    </div>
  );
}

export default Hero;
