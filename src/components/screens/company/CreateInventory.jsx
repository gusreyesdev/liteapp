import { useEffect, useState } from "react";
import { useForm, useCompanyStore } from "../../../hooks";
import "./Company.css";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const createFormFields = {
  name: "",
};

export const CreateInventory = () => {
  const { companies, startLoadingCompanies, isLoading, startCreateInventory } =
    useCompanyStore();

  const [selectCompany, setSelectCompany] = useState({});

  const navigate = useNavigate();

  const { name, address, phone, onInputChange } = useForm(createFormFields);

  const handleChangeCompany = (e) => {
    setSelectCompany({
      company: e.target.value,
    });
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "Nombre no es valido",
      });
      return false;
    }

    return true;
  };

  const createSubmit = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      startCreateInventory({
        selectCompany,
        name: name,
      });
    }
  };

  useEffect(() => {
    startLoadingCompanies();
  }, []);

  return (
    <div className="container mt-5 centered">
      <form onSubmit={createSubmit}>
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

        <div className="form-floating mb-3">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={onInputChange}
          />
          <label>Nombre</label>
        </div>

        <div className="d-grid gap-2 mt-2">
          <button
            className="btn btn-secondary"
            onClick={createSubmit}
            //disabled={loading}
          >
            Crear
          </button>
        </div>
      </form>
    </div>
  );
};
