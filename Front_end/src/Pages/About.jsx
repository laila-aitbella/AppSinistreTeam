import React from "react";
import Navbar from "../Componnents/Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// 👉 Import des icônes depuis react-icons
import { FaFileAlt, FaBell, FaHistory, FaLock, FaBolt, FaLink, FaWpforms } from "react-icons/fa";

const About = () => {
  const features = [
    { icon: <FaWpforms size={28} />, title: "Déclaration rapide d’un sinistre" },
    { icon: <FaFileAlt size={28} />, title: "Génération automatique de rapports PDF" },
    { icon: <FaBell size={28} />, title: "Notifications en temps réel" },
    { icon: <FaHistory size={28} />, title: "Historique des déclarations" },
    { icon: <FaLock size={28} />, title: "Vérification sécurisée du constateur" },
    { icon: <FaLink size={28} />, title: "Sécurisation via blockchain" },
    { icon: <FaBolt size={28} />, title: "Traitement rapide des sinistres" }
  ];

  const team = [
    {
      name: "Laila Ait Bella",
      role: "Etudiante 2e année IDF à l'ENSIAS ",
      image: "/laila.png"
    },
    {
      name: "Wassima Mhanni",
      role: "Etudiante 2e année IDF à l'ENSIAS",
      image: "/membre2.png"
    },
    {
      name: "Chaimae Lahoui",
      role: "Etudiante 2e année IDF à l'ENSIAS",
      image: "/chaimae.png"
    }
  ];

  return (
    <>
      <div className="about-wrapper">
        

        <section className="about-section">
          <h2>Notre mission</h2>
          <p>
            Offrir une solution innovante et fluide pour déclarer et gérer vos sinistres d’assurance, en combinant la puissance de la technologie à une interface intuitive.
          </p>
        </section>

        <section className="about-section carrousel-section">
          <h2>Fonctionnalités clés</h2>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            centeredSlides={true}
            loop={true}
            grabCursor={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            style={{ paddingBottom: "2rem" }}
          >
            {features.map((f, i) => (
              <SwiperSlide key={i}>
                <div className="carousel-card">
                  <div style={{ marginBottom: "1rem", color: "#2c3e50" }}>
                    {f.icon}
                  </div>
                  <p>{f.title}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section className="about-section">
          <h2>Pourquoi nous choisir ?</h2>
          <p>
            AssurClaim offre une interface claire et efficace, soutenue par des technologies comme la blockchain, l’automatisation de documents et des systèmes de notifications intelligents.
          </p>
        </section>

        <section className="about-section">
          <h2>Notre équipe</h2>
          <div className="team-grid">
            {team.map((member, i) => (
              <div className="team-card" key={i}>
                <img src={member.image} alt={member.name} />
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
