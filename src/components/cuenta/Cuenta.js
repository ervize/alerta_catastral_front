import { useState, useEffect } from "react";
import axios from "axios";
import Alerta from "../alert/Alerta";
import PersonIcon from "@material-ui/icons/Person";
import Button from "@material-ui/core/Button";
import Estilos from "./css/cuenta.module.scss";
import { useHistory } from "react-router-dom";

export function Cuenta() {
  const [status, setStatus] = useState("0");
  const [user, setUser] = useState({
    CodTipoDoc: "",
    NumDocumento: "",
    FecEmision: "",
    Nombres: "",
    ApPaterno: "",
    ApMaterno: "",
    Email: "",
    NumCelular: "",
    CodUsuario: "",
  });

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
        .get("http://localhost:3000/api/v1/usuario/" + id, config)
        .then((res) => {
          document.getElementById("codtipodoc").value = res.data[0].codtipodoc;
          document.getElementById("numdoc").value = res.data[0].numdoc;
          document.getElementById("nombres").value = res.data[0].nombres;
          document.getElementById("paterno").value = res.data[0].paterno;
          document.getElementById("materno").value = res.data[0].materno;
          document.getElementById("email").value = res.data[0].email;
          document.getElementById("numcel").value = res.data[0].numcel;
          setUser(res.data);
        })
        .catch((e) => {
          history.push("/LogIn");
        });
    } catch {
      setStatus("404");
    }

    return <div>HOLA</div>;
  }, []);

  const handleOnSave = (event) => {
    setStatus("0");
  };

  const handleChange = (event) => {
    user[event.target.id] = event.target.value;
  };

  return (
    <div>
      <div className={`${Estilos.form} bg-white m-2 p-2`}>
        {status == "201" ? (
          <Alerta mensaje="¡ Cuenta creada correctamente ! Se ha enviado un email para activar su cuenta" />
        ) : status == "0" ? (
          ""
        ) : (
          <Alerta mensaje="¡ Error creando cuenta !" />
        )}

        <div className="titulo">¡DATOS DE LA CUENTA!</div>

        <div className="d-flex flex-column mb-1">
          <label htmlFor="codtipodoc">Tipo de Documento</label>
          <select
            id="codtipodoc"
            defaultValue="0"
            onChange={handleChange}
            disabled
          >
            <option value="0" selected>
              Seleccionar tipo de documento
            </option>
            <option value="01">Documento Nacional de Identidad</option>
            <option value="02">Carnet de extranjeria</option>
            <option value="03">Pasaporte</option>
          </select>

          <label htmlFor="numdoc">N° de Documento</label>
          <input type="text" id="numdoc" onChange={handleChange} disabled />

          <label htmlFor="nombres">Nombres</label>
          <input type="text" id="nombres" onChange={handleChange} disabled />

          <label htmlFor="paterno">Apellido Paterno</label>
          <input type="text" id="paterno" onChange={handleChange} disabled />

          <label htmlFor="materno">Apellido Materno</label>
          <input type="text" id="materno" onChange={handleChange} disabled />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={handleChange} disabled />

          <label htmlFor="numcel">N° Celular</label>
          <input type="text" id="numcel" onChange={handleChange} />

          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<PersonIcon />}
            onClick={handleOnSave}
            className="mt-1"
          >
            Actualizar
          </Button>
        </div>
      </div>
    </div>
  );
}
