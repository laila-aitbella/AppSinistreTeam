import React from "react";
import Navbar from "../Componnents/Navbar";
import Footer from "../Componnents/Footer";
// import "../styles/Home.css"; // Assure-toi de l'importer si nécessaire

const Home = () => {
  return (
    <>
     

      {/* SECTION D'ACCUEIL */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-md-10">
              <h1
                className="display-4 fw-bold fade-in"
                style={{
                  color: "#2C3E50",
                  textShadow: "1px 1px 2px rgba(213, 31, 31, 0.1)",
                  letterSpacing: "1px"
                }}
              >
                Bienvenue sur AssurClaim
              </h1>

              <p className="lead mt-3 text-muted">
                Gérez vos sinistres en toute simplicité, sécurité et rapidité.
                <br />
                Notre plateforme vous guide pas à pas.
              </p>
            </div>
          </div>
        </div>

        <section className="py-0" style={{ margin: 0, padding: 0 }}>
        <section className="py-0" style={{ margin: 0, padding: 0 }}>
 
</section>

</section>



      </section>

      {/* SECTION AVANTAGES */}
      <section className="py-5 bg-deep-blue border-top">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold display-6 text-white">
            Pourquoi choisir AssurClaim ?
          </h2>

          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="feature-card card-hover card-light-blue">
                <i className="bi bi-check-circle feature-icon text-success"></i>
                <h5 className="mt-3 fw-semibold">Déclaration facile</h5>
                <p>Soumettez vos sinistres en quelques clics depuis n'importe quel appareil.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card card-hover card-light-blue">
                <i className="bi bi-shield-lock feature-icon text-primary"></i>
                <h5 className="mt-3 fw-semibold">Sécurité garantie</h5>
                <p>Toutes vos données sont chiffrées et protégées via la blockchain.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card card-hover card-light-blue">
                <i className="bi bi-speedometer feature-icon text-warning"></i>
                <h5 className="mt-3 fw-semibold">Traitement rapide</h5>
                <p>Nos systèmes automatisés réduisent les délais de traitement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION COMMENT UTILISER */}
      <section className="py-5 bg-white border-top">
        <div className="container">
     



    

          {/* Étapes */}
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="feature-card card-hover card-dark-style">
                <i className="bi bi-pencil-square fs-1 text-primary feature-icon"></i>
                <h5 className="mt-3 fw-semibold">1. Créez votre compte</h5>
                <p>Inscrivez-vous en quelques clics pour accéder à votre espace assuré.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card card-hover card-dark-style">
                <i className="bi bi-cloud-upload fs-1 text-success feature-icon"></i>
                <h5 className="mt-3 fw-semibold">2. Déclarez votre sinistre</h5>
                <p>Remplissez le formulaire avec les détails de l'accident et ajoutez les justificatifs.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card card-hover card-dark-style">
                <i className="bi bi-graph-up-arrow fs-1 text-warning feature-icon"></i>
                <h5 className="mt-3 fw-semibold">3. Suivez le traitement</h5>
                <p>Consultez l’état d’avancement de votre dossier en temps réel.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
