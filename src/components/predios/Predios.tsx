import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import NotificationImportantIcon from "@material-ui/icons/NotificationImportant";
import CancelIcon from "@material-ui/icons/Cancel";
import { IPredio } from "../../models/IPredio";
import Estilos from "./css/predios.module.scss";
import ScrollDialog from "../notify/Notify";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import axios from "axios";

export function Predios() {
  const [predios, setPredios] = useState<IPredio[]>([]);
  const [open, setOpen] = React.useState(false);
  const [codcatas, setCodcatas] = React.useState("");
  let history = useHistory();

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
        .get("http://localhost:3000/api/v1/predios/" + id, config)
        .then((res) => {
          let p: IPredio[] = [];
          res.data.map((predio: IPredio, key: number) => {
            p.push({
              id: predio.id,
              codusuario: predio.codusuario,
              codficha: predio.codficha,
              codcatastral: predio.codcatastral,
              nummodif: 1,
              codtipopredio: predio.codtipopredio,
              estado: predio.estado,
              responsable: "",
              fecregistro: new Date(),
              maquina: "",
              ip: "",
            });
          });
          setPredios([...predios, ...p]);
        })
        .catch((e) => {
          history.push("/LogIn");
        });
    } catch {}
  }, []);

  const addPredio = () => {
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
          "http://localhost:3000/api/v1/sgtm/" +
            (document.getElementById("CodCatastral") as HTMLInputElement)
              ?.value +
            "/" +
            (document.getElementById("codtipopredio") as HTMLInputElement)
              ?.value,
          config
        )
        .then((res) => {
          if (res.data.rowsAffected[0] == 1) {
            const moment = require("moment");

            let user: IPredio = {
              id: "0",
              codusuario: id == null ? "" : id,
              codficha: "",
              codcatastral: (
                document.getElementById("CodCatastral") as HTMLInputElement
              ).value,
              nummodif: 1,
              codtipopredio: (
                document.getElementById("codtipopredio") as HTMLInputElement
              ).value,
              estado: "A",
              responsable: "",
              fecregistro: moment().format("YYYY-MM-DD hh:mm:ss"),
              maquina: "",
              ip: "",
            };

            axios
              .post("http://localhost:3000/api/v1/predios", user, config)
              .then((res) => {
                setPredios([...predios, user]);
                (
                  document.getElementById("CodCatastral") as HTMLInputElement
                ).value = "";
              })
              .catch((e) => {});
          }
        })
        .catch((e) => {});
    } catch {}
  };

  const deletePredio = (Id: string): void => {

    let source = axios.CancelToken.source();
    let token = localStorage.getItem("token");
    let id = localStorage.getItem("id");

    let user = {
      codusuario: id,
      codficha: "",
      codcatastral: Id,
    };

    const config = {
      headers: { Authorization: `Bearer ${token}` },
      cancelToken: source.token,
      data: user,
    };

    //axios.interceptors.request.eject(0);

    axios
      .delete("http://localhost:3000/api/v1/predios", config)
      .then((res) => {
        setPredios(predios.filter((predio) => predio.codcatastral != Id));
      })
      .catch((e) => {});
  };

  const seeNotify = (codcatastral: string) => {
    setCodcatas(codcatastral);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover  table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Predio</th>
            <th scope="col">Codigo Catastral</th>
            <th scope="col">Estado</th>
            <th scope="col">Notificaciones</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {predios.map((predio: IPredio, key: number) => {
            return (
              <tr key={predio.id}>
                <th scope="row">{predio.id}</th>
                <td>{predio.codtipopredio}</td>
                <td>{predio.codcatastral}</td>
                <td>{predio.estado}</td>
                <td>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<NotificationImportantIcon />}
                    onClick={() => {
                      seeNotify(predio?.codcatastral);
                      //setOpen(false);
                    }}
                  >
                    Ver
                  </Button>
                </td>
                <td>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    startIcon={<CancelIcon />}
                    onClick={() => deletePredio(predio?.codcatastral)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="d-flex flex-row justify-content-start align-items-center  p-4">
        {/* <label htmlFor="tipopredio">Tipo de Documento</label> */}
        <select id="codtipopredio" defaultValue="0">
          <option value="0" selected>
            Seleccionar Tipo Predio
          </option>
          <option value="1">Predio Urbano</option>
          <option value="2">Predio Rural</option>
        </select>

        <input
          id="CodCatastral"
          className={`m-2 ${Estilos.add} ${Estilos.color}`}
          type="text"
          placeholder="Ingrese código catastral"
          maxLength={26}
        />
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<HomeWorkIcon />}
          onClick={addPredio}
        >
          AGREGAR PREDIO
        </Button>
        {open == true ? (
          <ScrollDialog
            open={true}
            close={handleClose}
            codcatastral={codcatas}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
