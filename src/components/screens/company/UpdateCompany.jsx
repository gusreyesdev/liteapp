import { useEffect, useState } from "react";
import { useForm, useCompanyStore } from "../../../hooks";
import "./Company.css";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const updateFormFields = {
  name: "",
  address: "",
  phone: "",
};

export const UpdateCompany = () => {
  const { companies, startLoadingCompanies, starUpdateCompany, isLoading } =
    useCompanyStore();

  const [selectCompany, setSelectCompany] = useState({});

  const navigate = useNavigate();

  const { name, address, phone, onInputChange } = useForm(updateFormFields);

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
    } else if (address.trim().length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "Direccion no es valida",
      });
      return false;
    } else if (phone.trim().length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "Telefono no es valida",
      });
      return false;
    }
    return true;
  };

  const updateSubmit = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      starUpdateCompany({
        selectCompany,
        name: name,
        address: address,
        phone: phone,
      });
    }
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

        <div className="form-floating mb-3">
          <input
            type="text"
            name="address"
            className="form-control"
            placeholder="Address"
            value={address}
            onChange={onInputChange}
          />
          <label>Direccion</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="number"
            name="phone"
            className="form-control"
            placeholder="phone"
            value={phone}
            onChange={onInputChange}
          />
          <label>Telefono</label>
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
