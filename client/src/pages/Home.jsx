import React from 'react';
import Hero from '../components/Hero';
import PropertyList from '../components/PropertyList';

const Home = () => {
  return (
    <>
      <main>
        <article>
          <Hero />
          <PropertyList />
          
          {/* CTA Section */}
          <section className="cta">
            <div className="container">
              <div className="cta-card">
                <div className="card-content">
                  <h2 className="h2 card-title">Looking for a dream home?</h2>
                  <p className="card-text">We can help you realize your dream of a new home</p>
                </div>
                <a href="#property" className="btn cta-btn">
                  <span>Explore Properties</span>
                  <ion-icon name="arrow-forward-outline"></ion-icon>
                </a>
              </div>
            </div>
          </section>
        </article>
      </main>
    </>
  );
};

export default Home;