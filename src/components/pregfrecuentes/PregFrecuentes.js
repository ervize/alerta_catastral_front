import React from "react";
import "./css/pregfrecuentes.scss";

export function PregFrecuentes() {
  return (
    <div className="fondo infointeres text-warning">
      <div>PREGUNTAS FRECUENTES</div>

      <ul>
        <li>
          ¿Para que me sirve el servicio de ¡Alerta Catastral!?
          <p>
            Este servicio gratuito le brinda la posibilidad de ser informado a
            traves de correo electronico o mensaje de texto de cualquier
            modificación sobre una ficha catastral de su interes. De esta
            manera, tendra conocimiento oportuno de posibles modificaciones
            basados en documentacion falsa o suplantacion de personas.{" "}
          </p>
        </li>

        <li>
          ¿Cuanto me cuesta el servicio ¡Alerta Catastral!?
          <p>El servicio es Gratuito. </p>
        </li>

        <li>
          ¿A cuantas fichas catastrales puedo suscribirme?
          <p>
            No hay limite en la suscripción de fichas para el servicio de
            ¡Alerta Catastral!. Mediante una sola cuenta usted puede afiliar las
            fichas catastrales que usted desee.{" "}
          </p>
        </li>

        <li>
          ¿Si tengo alguna duda en el acceso o uso del servicio a donde puedo
          comunicarme?
          <p>
            Usted puede llamar al Telefono N° 073 - 505050 o enviar un correo
            electronico a info@mps.gob.personas. Tambien puede consultar la{" "}
            <a href="#">Guia de uso rapido.</a>
          </p>
        </li>
      </ul>
    </div>
  );
}
