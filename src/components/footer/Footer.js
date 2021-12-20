import "./css/footer.scss";

export function Footer() {
  return (
    <footer className="bg-success bg-gradient">
      <div className="row p-2 d-flex flex-row justify-content-between align-items-center">
        <div className="col-md-8 d-flex flex-column justify-content-center align-items-left">
          <span>SEDE CENTRAL</span>
          <div>
            CL. Bolivar N° 160, Sullana, Piura - Perú. Central Telefónica (051)
            208 - 3100 (Municipalidad Provincial de Sullana){" "}
          </div>
        </div>
        <div className="col-md-4 ">
          Mayor información ALÓ MPS (Línea gratuita): 0800 - 27164
          consultas@munisullana.gob.pe
        </div>
      </div>
    </footer>
  );
}
