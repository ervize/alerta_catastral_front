import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Administrador } from "../pages/Administrador";
import { HomePage } from "../pages/HomePage";
import { PregFrecuentes } from "../pages/PregFrecuentes";
import { InfoInteres } from "../pages/InfoInteres";
import { SignInPage } from "../pages/SignInPage";
import { LogIn } from "../pages/LogIn";
import { MiCuenta } from "../pages/MiCuenta";
import { SecuredRoute } from "./SecureRouter";
import { Mensajes } from "../pages/Mensajes";

export function AppRouter() {
  return (
    <Router>
      <Switch>
        
        <SecuredRoute path="/Administrador" component={Administrador} />
        <SecuredRoute path="/MiCuenta" component={MiCuenta} />

        <Route path="/HomePage">
          <HomePage />
        </Route>
        <Route path="/PregFrecuentes">
          <PregFrecuentes />
        </Route>

        <Route path="/InfoInteres">
          <InfoInteres />
        </Route>

        <Route path="/SignInPage">
          <SignInPage />
        </Route>

        <Route path="/LogIn">
          <LogIn />
        </Route>

        <Route exact path="/">
          <HomePage />
        </Route>

        <Route path="/Mensajes">
          <Mensajes />
        </Route>

        <Route path="*">
          <h1>ERROR 404 Página no encontrada</h1>
        </Route>
      </Switch>
    </Router>
  );
}
