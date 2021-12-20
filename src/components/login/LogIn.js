import { useState } from "react";
import Button from "@material-ui/core/Button";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Alerta from "../alert/Alerta";
import axios from "axios";
import { useHistory } from "react-router-dom";

export function LogIn(props) {
  

  const [userValid, setUserValid] = useState(true);
  const history = useHistory();

  const [user, setUser] = useState({
    email: "",
    passw: "",
  });

  const validUser = () => {
    let source = axios.CancelToken.source();

    try {
      axios
        .post("http://localhost:3000/api/v1/login", user, {
          cancelToken: source.token,
          timeout: 2000,
        })
        .then((res) => {
          if (res.data.Ok) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.id);
            history.push("/Administrador");
            setUserValid(true);
          } else {
            setUserValid(false);
          }
        })
        .catch((e) => {
          setUserValid(false);
        });
    } catch {
      setUserValid(false);
    }
  };

  const handleChange = (event) => {
    user[event.target.id] = event.target.value;
  };

  return (
    <div>
      <div className="form bg-white">
        <div className="titulo">¡INGRESA AL SISTEMA!</div>

        {!userValid ? (
          <Alerta mensaje="¡ Error en usuario y/o contraseña !" />
        ) : (
          ""
        )}

        <div className="d-flex flex-column mb-1">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" onChange={handleChange} />

          <label htmlFor="passw">Contraseña:</label>
          <input type="password" id="passw" onChange={handleChange} />

          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<LockOpenIcon />}
            onClick={validUser}
            className="mt-1"
          >
            Ingresar
          </Button>
        </div>
      </div>
    </div>
  );
}
