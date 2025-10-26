import React from 'react';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <p className="hero-subtitle">
            <ion-icon name="home"></ion-icon>
            <span>Indian Real Estate Platform</span>
          </p>

          <h2 className="h1 hero-title">Find Your Dream Property In India</h2>

          <p className="hero-text">
            Discover the perfect home across major Indian cities. From Mumbai to Bengaluru, 
            find properties that match your lifestyle and budget.
          </p>

          <a href="#property" className="btn">Explore Properties</a>
        </div>

        <figure className="hero-banner">
          <img src="/assets/images/hero-banner.png" alt="Modern house model" className="w-100" />
        </figure>
      </div>
    </section>
  );
};

export default Hero;