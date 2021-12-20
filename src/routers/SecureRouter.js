import {Route, Redirect } from "react-router-dom";
import axios from "axios";

export function SecuredRoute(props) {
  const authentication = {
    isLoggedIn: false,

    onAuthentication() {
      this.isLoggedIn = true;
    },
    async getLogInStatus() {
      let source = axios.CancelToken.source();
      let token = localStorage.getItem("token");
      if (token === null) token = "x.y.z";

      await axios
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
            this.isLoggedIn = false;
          } else {
            this.isLoggedIn = true;
          }
        })
        .catch((e) => {
          this.isLoggedIn = false;
        });
      return this.isLoggedIn;
    },
  };


  return (
    <Route
      path={props.path}
      render={(data) =>
        authentication.getLogInStatus() ? (
          <props.component {...data}></props.component>
        ) : (
          <Redirect to={{ pathname: "/" }}></Redirect>
        )
      }
    ></Route>
  );
}
