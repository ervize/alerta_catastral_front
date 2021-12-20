import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core//DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IMensaje } from "../../models/IMensaje";
import Estilos from "./css/notify.module.scss";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";

export default function ScrollDialog(props: any) {
  const [typescroll, setTypeScroll] = React.useState<any>("paper");
  const [mensajes, setMensajes] = useState<IMensaje[]>([]);
  const descriptionElementRef = React.useRef(null);

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
        .get(
          `http://localhost:3000/api/v1/mensajes?codusuario=${id}&id1=${props.codcatastral}&id2=&id3=`, config
        )
        .then((res) => {
          let p: IMensaje[] = [];

          res.data.map((mensaje: IMensaje, key: number) => {
            p.push({
              id: mensaje.id,
              codmensaje: "",
              fecmensaje: mensaje.fecmensaje,
              mensaje: mensaje.mensaje,
              id_1: "",
              numreceptor: "",
              estenviosms: "",
            });
          });
          setMensajes([...mensajes, ...p]);
        })
        .catch((e) => {});
    } catch {}
  }, []);

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.close} //handleClose
        scroll={typescroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Notificaciones:</DialogTitle>
        <DialogContent dividers={typescroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div className="table-responsive">
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th scope="col">Fecha</th>
                    <th scope="col">Mensaje</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {mensajes.map((mensaje: IMensaje, key: number) => {
                    return (
                      <tr key={mensaje?.id}>
                        <td>{mensaje.fecmensaje}</td>
                        <td className={Estilos.sms}>{mensaje.mensaje}</td>
                        <td>{""}</td>
                        <td>{""}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={props.close}>Cancel</Button> */}
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={props.close}
            startIcon={<CancelIcon />}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
