import React from "react";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import Estilos from "./css/add.module.css";
import { IPredio } from "../../models/IPredio";

export function Add() {
  const addPredio = () => {
    alert("Predio agregado correctamente!");
  };

  return (
    <div className="d-flex flex-row justify-content-start align-items-center  p-4">
      <input
        className={`m-2 ${Estilos.add} ${Estilos.color}`}
        type="text"
        placeholder="Ingrese codigo catastral"
      />
      <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<SaveIcon />}
        onClick={addPredio}
      >
        AGREGAR PREDIO
      </Button>
    </div>
  );
}
