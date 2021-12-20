import "./css/options.module.scss";
import CancelIcon from "@material-ui/icons/Cancel";
import Button from "@material-ui/core/Button";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import axios from "axios";

export function Options() {
  const history = useHistory();

  const cerrarChange = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    history.push("/HomePage");
  };

  const cancelUserAcount = () => {
    let source = axios.CancelToken.source();
    let token = localStorage.getItem("token");
    let id = localStorage.getItem("id");

    const moment = require("moment");

    let user = {
      codusuario: id,
      responsable: "",
      fecregistro: moment().format("YYYY-MM-DD hh:mm:ss"),
      maquina: "",
      ip: "",
    };

    const config = {
      headers: { Authorization: `Bearer ${token}` },
      cancelToken: source.token,
      data: user,
    };

    axios
      .delete("http://localhost:3000/api/v1/usuario", config)
      .then((res) => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        history.push("/HomePage");
      })
      .catch((e) => {});
  };

  return (
    <div className="d-flex  justify-content-end align-items-center  p-4">
      <Button
        onClick={cerrarChange}
        variant="contained"
        color="secondary"
        size="small"
        className="m-1"
        startIcon={<CancelPresentationIcon />}
      >
        CERRAR SESIÓN
      </Button>

      <Button
        component={Link}
        to="/miCuenta"
        variant="contained"
        color="primary"
        size="small"
        className="m-1"
        startIcon={<AccountCircleIcon />}
      >
        MI CUENTA
      </Button>

      <Button
        component={Link}
        to="/Administrador"
        variant="contained"
        color="primary"
        size="small"
        className="m-1"
        startIcon={<HomeWorkIcon />}
      >
        MIS PREDIOS
      </Button>

      <Button
        onClick={cancelUserAcount}
        variant="contained"
        color="secondary"
        size="small"
        className="m-1"
        startIcon={<CancelIcon />}
      >
        CANCELAR CUENTA
      </Button>
    </div>
  );
}
