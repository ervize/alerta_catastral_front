import React, { Fragment } from "react";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";
import { Main } from "../components/main/Main";

export function SignInPage() {
  return (
    <div className="container d-flex flex-column ">
      <Fragment>
        <Header />
        <Main tipoComp="2" />
        <Footer />
      </Fragment>
    </div>
  );
}
