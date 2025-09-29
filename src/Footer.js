// src/components/Footer.js
import React from 'react';

const Footer = () => {
    const navbarStyle = {
        backgroundColor: '#ECECE2',
        color: '#494946',
        borderTop: "3px solid #836501",
      };
  return (
    <footer className="pt-4 pb-0 mt-4" style={navbarStyle}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h4 className='text-uppercase text-dark fw-semibold' style={{color: 'white'}}>Ministerio de Ciencia, Innovación y Universidades</h4>
            <br />
            <h6>
            2 Manuel Cortina. 28071 - Madrid. España
              <br />
              <br />
              Conéctese con el gob | Declaración de Privacidad y Seguridad
            </h6>
            <p>
            © 2025 Todos los Derechos Reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
