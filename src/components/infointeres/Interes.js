import Estilos from  "./css/interes.module.scss";

export function Interes() {
  return (
    <div className={`${Estilos.fondo} ${Estilos.infointeres} text-warning`}>
      <div>INFORMACION DE INTERES</div>

      <ul>
        <li>
          <a href="#">Guia de Uso</a>
        </li>
        <li>
          <a href="#">
            ¿Que hacer despues de recibir un correo electrónico o mensaje de
            texto de ¡Alerta Catastral! ?
          </a>
        </li>
        <li>
          <a href="#">Resolución del Servicio de ¡Alerta Catastral!</a>
        </li>
      </ul>
    </div>
  );
}
