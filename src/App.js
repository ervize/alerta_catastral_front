import { Fragment } from "react";
import { AppRouter } from "./routers/AppRouter";

export function App() {
  return (
    <div className="container d-flex flex-column ">
      <Fragment>
        <AppRouter />
      </Fragment>
    </div>
  );
}
