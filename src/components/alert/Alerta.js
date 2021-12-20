import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import "./css/alerta.scss";

export default function Alerta(props) {
  const [show, setShow] = useState(true);

  return (
    <div>
      <Alert show={show} variant="success">
        <p className="d-flex justify-content-center">{props.mensaje}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Cerrar
          </Button>
        </div>
      </Alert>
    </div>
  );
}
