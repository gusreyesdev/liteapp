import { useEffect, useState } from "react";
import { useForm, useCompanyStore } from "../../../hooks";
import "./Company.css";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const DeleteCompany = () => {
  const { companies, startLoadingCompanies, startDeleteCompany, isLoading } =
    useCompanyStore();

  const [selectCompany, setSelectCompany] = useState({});

  const navigate = useNavigate();

  const handleChangeCompany = (e) => {
    setSelectCompany({
      company: e.target.value,
    });
  };

  const updateSubmit = (event) => {
    event.preventDefault();

    startDeleteCompany({
      selectCompany
    });
  };

  useEffect(() => {
    startLoadingCompanies();
  }, []);

  return (
    <div className="container mt-5 centered">
      <form onSubmit={updateSubmit}>
        <div className="form-floating mb-3">
          <select
            className="form-select"
            defaultValue="0"
            onChange={handleChangeCompany}
          >
            <option value="0" disabled>
              Seleccione una Empresa
            </option>

            {companies.map((company) => (
              <option key={company.nit} value={company.nit}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <div className="d-grid gap-2 mt-2">
          <button
            className="btn btn-secondary"
            onClick={updateSubmit}
            //disabled={loading}
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
};
