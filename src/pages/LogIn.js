import { Fragment } from "react";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";
import { Main } from "../components/main/Main";

export function LogIn() {
  return (
    <div className="container d-flex flex-column ">
      <Fragment>
        <Header />
        <Main tipoComp="3" />
        <Footer />
      </Fragment>
    </div>
  );
}
