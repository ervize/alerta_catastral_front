import React from "react";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";
import { Cuenta } from "../components/cuenta/Cuenta";
import { Options } from "../components/options/Options";
import EstilosMiCuenta from "./css/micuenta.module.scss";

export function MiCuenta() {
  return (
    <div className="container d-flex flex-column">
      <Header />
      <Options />
      <div
        className={`d-flex flex-row justify-content-end  ${EstilosMiCuenta.fondo}`}
      >
        <Cuenta />
      </div>
      <Footer />
    </div>
  );
}
