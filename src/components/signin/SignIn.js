import React, { useState, useEffect } from "react";
import "./css/signin.css";
import axios from "axios";
import Alerta from "../alert/Alerta";
import PersonIcon from "@material-ui/icons/Person";
import Button from "@material-ui/core/Button";
import AutorenewIcon from "@material-ui/icons/Autorenew";

export function SignIn() {
  const [status, setStatus] = useState("0");
  const [miip, setIP] = useState("");

  const [user, setUser] = useState({
    codusuario: "",
    nummodif: 1,
    paterno: "",
    materno: "",
    nombres: "",
    codtipodoc: "",
    numdoc: "",
    email: "",
    numcel: "",
    passw: "",
    estado: "N",
    responsable: "SISTEMAS",
    fecregistro: new Date().toLocaleString(),
    maquina: "SERVIDOR",
    ip: '127.0.0.1',
  });

  // const getIp = () => {
  //   const res = axios
  //     .get("https://geolocation-db.com/json/")
  //     .then((res) => {
  //       // console.log(res.data);
  //       setIP(res.data.IPv4);
  //       // console.log(res.data.IPv4);
  //     })
  //     .catch((e) => {
  //       setStatus(e.code);
  //     });
  // };

  // useEffect(() => {
  //   //passing getData method to the lifecycle method
  //   //getIp();
  // }, []);

  const handleOnSave = (event) => {
    setStatus("0");
    const moment = require("moment");

    user.ip = '127.0.0.1';
    user.maquina = window.location.hostname;
    user.fecregistro = moment().format("YYYY-MM-DD hh:mm:ss");

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
        .post("http://localhost:3000/api/v1/usuario", user, config)
        .then((res) => {
          document.getElementById("codtipodoc").value = "";
          document.getElementById("numdoc").value = "";
          document.getElementById("nombres").value = "";
          document.getElementById("paterno").value = "";
          document.getElementById("materno").value = "";
          document.getElementById("email").value = "";
          document.getElementById("numcel").value = "";
          setStatus(res.status);
        })
        .catch((e) => {
          setStatus(e.code);
        });
    } catch {
      setStatus("404");
    }
  };

  const handleChange = (event) => {
    user[event.target.id] = event.target.value;
  };

  return (
    <div className="form bg-white">
      {status == "200" ? (
        <Alerta
          mensaje={
            "¡ Cuenta creada correctamente ! Se ha enviado un email para activar su cuenta"
          }
        />
      ) : status == "0" ? (
        ""
      ) : (
        <Alerta mensaje="¡ Error creando cuenta !" />
      )}
      <form>
        <div className="titulo">¡REGÍSTRATE AHORA!</div>

        <div className="d-flex flex-column mb-1">
          <label htmlFor="codtipodoc">Tipo de Documento</label>
          <select id="codtipodoc" defaultValue="0" onChange={handleChange}>
            <option value="0" selected>
              Seleccionar tipo de documento
            </option>
            <option value="01">Documento Nacional de Identidad</option>
            <option value="02">Carnet de extranjeria</option>
            <option value="03">Pasaporte</option>
          </select>

          <label htmlFor="numdoc">N° de Documento</label>
          <input
            type="text"
            id="numdoc"
            onChange={handleChange}
            placeholder="Ingrese número de documento"
          />

          <label htmlFor="nombres">Nombres</label>
          <input
            type="text"
            id="nombres"
            onChange={handleChange}
            required
            placeholder="Ingrese nombres"
          />

          <label htmlFor="paterno">Apellido Paterno</label>
          <input
            type="text"
            id="paterno"
            onChange={handleChange}
            required
            placeholder="Ingrese apellido paterno"
          />

          <label htmlFor="materno">Apellido Materno</label>
          <input
            type="text"
            id="materno"
            onChange={handleChange}
            required
            placeholder="Ingrese apellido materno"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            pattern="[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})"
            onChange={handleChange}
            required
            placeholder="Ingrese email"
          />

          <label htmlFor="numcel">N° Celular</label>
          <input
            type="text"
            id="numcel"
            onChange={handleChange}
            required
            placeholder="Ingrese N° celular"
          />

          <label htmlFor="passw">Password</label>
          <input
            type="password"
            id="passw"
            onChange={handleChange}
            required
            placeholder="Ingrese password"
          />

          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<PersonIcon />}
            onClick={handleOnSave}
            className="mt-1"
          >
            Crear Usuario
          </Button>
        </div>
      </form>
    </div>
  );
}
