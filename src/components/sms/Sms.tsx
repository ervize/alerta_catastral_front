import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/icons/Cancel";
import { IMensaje } from "../../models/IMensaje";
import Alert from "@mui/material/Alert";

import axios from "axios";

export function Sms() {
  const [mensajes, setMensajes] = useState<IMensaje[]>([]);
  const token = localStorage.getItem("token");
  const [alert, setAlert] = useState(0);

  useEffect(() => {
    if (alert != 0) setTimeout(() => setAlert(0), 1000);
  }, [alert]);

  useEffect(() => {
    let source = axios.CancelToken.source();
    let token = localStorage.getItem("token");
    let id = localStorage.getItem("id");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
      cancelToken: source.token,
      timeout: 2000,
    };

    try {
      axios
        .get("http://localhost:3000/api/v1/mensajes?codusuario=&id1=&id2=&id3", config)
        .then((res) => {
          let p: IMensaje[] = [];
          res.data.map((sms: IMensaje, key: number) => {
            p.push({
              id: sms.id,
              codmensaje: sms.codmensaje,
              fecmensaje: sms.fecmensaje,
              mensaje: sms.mensaje,
              id_1: sms.id_1,
              numreceptor: sms.numreceptor,
              estenviosms: sms.estenviosms,
            });
          });
          setMensajes([...mensajes, ...p]);
        })
        .catch((e) => {});
    } catch {}
  }, []);

  const deleteMensaje = (codmensaje: string): void => {
    let sms = 
    {
      codmensaje: "0000000002",
    };

  

    axios
      .delete("http://localhost:3000/api/v1/mensajes")
      .then((res) => {
        setMensajes(mensajes.filter((msg) => msg.codmensaje != codmensaje));
      })
      .catch((e) => {});
  };

  const sendMensaje = (
    codmensaje: string,
    numreceptor: string,
    mensaje: string
  ): void => {
    let source = axios.CancelToken.source();
    let sms = {
      numcel: numreceptor,
      message: mensaje,
    };

    axios
      .post("http://localhost:5000/api/v1/enviarsms", sms, {
        cancelToken: source.token,
        timeout: 10000,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.Ok) setAlert(1);
        else setAlert(2);
      })
      .catch((e) => {
        setAlert(2);
      });
  };

  return (
    <div className="table-responsive">
      {alert == 1 && (
        <Alert variant="filled" severity="success">
          Mensaje enviado correctamente
        </Alert>
      )}

      {alert == 2 && (
        <Alert variant="filled" severity="error">
          Error enviando mensaje
        </Alert>
      )}

      <table className="table table-hover  table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">CodMensaje</th>
            <th scope="col">CodCatastral</th>
            <th scope="col">Receptor</th>
            <th scope="col">Mensaje</th>
            <th scope="col">Enviado</th>
            <th scope="col"></th>
            {/* <th scope="col"></th> */}
          </tr>
        </thead>
        <tbody>
          {mensajes.map((msg: IMensaje, key: number) => {
            return (
              <tr key={msg.id}>
                <td scope="row">{msg.id}</td>
                <td>{msg.codmensaje}</td>
                <td>{msg.id_1}</td>
                <td>{msg.numreceptor}</td>
                <td>{msg.mensaje}</td>
                <td>{msg.estenviosms}</td>
                <td>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<CancelIcon />}
                    onClick={() =>
                      sendMensaje(
                        msg?.codmensaje,
                        msg?.numreceptor,
                        msg?.mensaje
                      )
                    }
                  >
                    Enviar
                  </Button>
                </td>
                {/* <td>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    startIcon={<CancelIcon />}
                    onClick={() => deleteMensaje(msg?.codmensaje)}
                  >
                    Eliminar
                  </Button>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
