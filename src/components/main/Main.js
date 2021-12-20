import { Fragment } from "react";
import "./css/main.scss";
import { Start } from "../start/Start";
import { SignIn } from "../signin/SignIn";
import { LogIn } from "../login/LogIn";
import { Interes } from "../infointeres/Interes";
import { PregFrecuentes } from "../pregfrecuentes/PregFrecuentes";

export function Main(props) {
  const tipoComp = props.tipoComp;

  return (
    <Fragment>
      <main className="d-flex flex-row justify-content-center align-items-center p-4">
        <div className="row d-flex align-items-center">
          <div className="col-md-4 d-flex flex-column justify-content-center align-items-center  fondo">
            <div className="alerta bg-warning bg-gradient">!</div>
            <span className="alertatitulo text-warning">ALERTA Catastral</span>
            <div className="alertatexto">
              Servicio gratuito que le brinda la posibilidad de ser informado a
              través de un correo electrónico y/o mensaje de texto, sobre el
              estado de los predios urbanos y/o rurales registrados en la
              municipalidad.
            </div>
          </div>

          <div className="col-md-4 d-flex justify-content-end align-items-center p-2"></div>

          <div className="col-md-4 d-flex justify-content-center align-items-center p-2">
            {tipoComp == 1 ? (
              <Start />
            ) : tipoComp == 2 ? (
              <SignIn />
            ) : tipoComp == 3 ? (
              <LogIn />
            ) : tipoComp == 4 ? (
              <Interes />
            ) : (
              <PregFrecuentes />
            )}
          </div>
        </div>
      </main>
    </Fragment>
  );
}
