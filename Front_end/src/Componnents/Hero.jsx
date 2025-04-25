import React from 'react';

const Hero = () => {
  return (
    <div className="text-center py-5">
      <div className="container">
        <h1 className="display-3 fw-bold">
          Bienvenue sur <span className="text-primary">AssurClaim</span>
        </h1>
        <p className="lead text-muted mt-3 mb-4">
          Plateforme intelligente pour déclarer, suivre et gérer vos sinistres en toute simplicité.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <a href="/signup" className="btn btn-success btn-lg px-4">Commencer</a>
          <a href="/about" className="btn btn-outline-secondary btn-lg px-4">En savoir plus</a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
