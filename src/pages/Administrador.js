import { useEffect } from "react";
import { Predios } from "../components/predios/Predios";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";
import { Options } from "../components/options/Options";
import axios from "axios";
import { useHistory } from "react-router-dom";

export function Administrador() {
  let history = useHistory();

  useEffect(() => {
    let source = axios.CancelToken.source();
    let token = localStorage.getItem("token");
    if (token === null) token = "x.y.z";

    axios
      .post(
        "http://localhost:3000/api/v1/validartoken",
        {
          token: token,
        },
        {
          cancelToken: source.token,
          timeout: 2000,
        }
      )
      .then((res) => {
        if (!res.data.Ok) {
          history.push("/LogIn");
        }
      })
      .catch((e) => {
        history.push("/LogIn");
      });
  });

  return (
    <div>
      <Header />
      <Options />
      <Predios />
      <Footer />
    </div>
  );
}
