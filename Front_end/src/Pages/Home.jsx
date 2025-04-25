import React from "react";
import Navbar from "../Componnents/Navbar";
import Footer from "../Componnents/Footer";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* SECTION D'ACCUEIL */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-md-10">
              <h1 className="display-4 fw-bold">
                Bienvenue sur <span className="text-primary">AssurClaim</span>
              </h1>
              <p className="lead mt-3 text-muted">
                Gérez vos sinistres en toute simplicité, sécurité et rapidité.
                <br />
                Notre plateforme vous guide pas à pas.
              </p>

              {/* ✅ Image centrale */}
              <img
                src="/accueil.png"
                alt="AssurClaim accueil"
                className="img-fluid my-4 rounded shadow-sm"
                style={{ maxHeight: "360px", width: "auto" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION AVANTAGES */}
      <section className="py-5 bg-white border-top">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold display-6">
            Pourquoi choisir <span className="text-primary">AssurClaim</span> ?
          </h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="p-4 h-100 border rounded shadow-sm">
                <i className="bi bi-check-circle text-success mb-3" style={{ fontSize: "3rem" }}></i>
                <h5 className="mt-3 fw-semibold">Déclaration facile</h5>
                <p className="text-muted">
                  Soumettez vos sinistres en quelques clics depuis n'importe quel appareil.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="p-4 h-100 border rounded shadow-sm">
                <i className="bi bi-shield-lock text-primary mb-3" style={{ fontSize: "3rem" }}></i>
                <h5 className="mt-3 fw-semibold">Sécurité garantie</h5>
                <p className="text-muted">
                  Toutes vos données sont chiffrées et protégées via la blockchain.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="p-4 h-100 border rounded shadow-sm">
                <i className="bi bi-speedometer text-warning mb-3" style={{ fontSize: "3rem" }}></i>
                <h5 className="mt-3 fw-semibold">Traitement rapide</h5>
                <p className="text-muted">
                  Nos systèmes automatisés réduisent les délais de traitement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION COMMENT UTILISER */}
      <section className="py-5 bg-white border-top">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Comment utiliser notre application ?</h2>

          {/* Vidéo démonstrative */}
          <div className="row justify-content-center mb-5">
            <div className="col-md-10">
              <div className="ratio ratio-16x9 shadow-sm rounded">
                <iframe
                  src="https://www.youtube.com/embed/votre_video_id"
                  title="Démonstration AssurClaim"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          {/* Étapes écrites */}
          <div className="row text-center">
            <div className="col-md-4">
              <div className="p-3">
                <i className="bi bi-pencil-square fs-1 text-primary"></i>
                <h5 className="mt-3 fw-semibold">1. Créez votre compte</h5>
                <p className="text-muted">
                  Inscrivez-vous en quelques clics pour accéder à votre espace assuré.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3">
                <i className="bi bi-cloud-upload fs-1 text-success"></i>
                <h5 className="mt-3 fw-semibold">2. Déclarez votre sinistre</h5>
                <p className="text-muted">
                  Remplissez le formulaire avec les détails de l'accident et ajoutez les justificatifs.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3">
                <i className="bi bi-graph-up-arrow fs-1 text-warning"></i>
                <h5 className="mt-3 fw-semibold">3. Suivez le traitement</h5>
                <p className="text-muted">
                  Consultez l’état d’avancement de votre dossier en temps réel.
                </p>
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
