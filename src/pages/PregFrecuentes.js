import React, { Fragment } from "react";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";
import { Main } from "../components/main/Main";

export function PregFrecuentes() {
  return (
    <div className="container d-flex flex-column ">
      <Fragment>
        <Header />
        <Main tipoComp="5" />
        <Footer />
      </Fragment>
    </div>
  );
}
