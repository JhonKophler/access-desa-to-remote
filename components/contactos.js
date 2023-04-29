import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Link from 'next/link'
import React from "react";

function VentanaContactos() {
  return (
    <div style={{display: 'flex',justifyContent: 'center'}}>
      <form className="form-newsletter">

        <div className="div-izq">
          <h4><b>Estemos en contacto</b></h4>
          <span >
            <Link href="#"><FontAwesomeIcon icon={faInstagram} /></Link>
            <Link href="#"><FontAwesomeIcon icon={faFacebook} /></Link>
            <Link href="#"><FontAwesomeIcon icon={faWhatsapp} /></Link>
          </span>
        </div>
        <div  className="div-der">
          <label htmlFor="emailnewsletter"><h4><b>Suscríbete para recibir nuestras novedades</b></h4></label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            name="email" placeholder='ingresa tu mail' /*value={email} onChange={handleChangeInput} required*/ />
          <button className="btn-suscripcion">Suscribirme</button>
        </div>
      </form>
    </div>
  );
}

export default VentanaContactos;