import React from "react";
import { Link } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Button from "@material-ui/core/Button";
import PersonIcon from "@material-ui/icons/Person";
import "./css/start.module.scss";

export function Start() {
  return (
    <div className="d-grid gap-2 col-5 mx-auto ">
      <Button
        component={Link}
        to="/LogIn"
        variant="contained"
        color="primary"
        size="small"
        startIcon={<LockOpenIcon />}
        className="lnk mt-1"
      >
        INGRESAR
      </Button>

      <Button
        component={Link}
        to="/SignInPage"
        variant="contained"
        color="secondary"
        size="small"
        startIcon={<PersonIcon />}
        className="mt-1 lnk"
      >
        REGÍSTRATE
      </Button>
    </div>
  );
}
