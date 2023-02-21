import { useEffect } from "react";
import { useForm, useCompanyStore } from "../../../hooks";
import "./Company.css";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const createFormFields = {
  nit: "",
  name: "",
  address: "",
  phone: "",
};

export const CreateCompany = () => {
  const { startCreateCompany, isLoading } = useCompanyStore();

  const navigate = useNavigate();

  const { nit, name, address, phone, onInputChange } =
    useForm(createFormFields);

  const isFormValid = () => {
    if (nit.trim().length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "Nit es obligatorio",
      });
      return false;
    } else if (name.trim().length === 0) {
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

  const createSubmit = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      startCreateCompany({
        nit: nit,
        name: name,
        address: address,
        phone: phone,
      });

      if (isLoading === false) {
        setTimeout(() => {
          navigate("/", {});
        }, 50);
      }
    }
  };

  return (
    <div className="container mt-5 centered">
      <form onSubmit={createSubmit}>
        <div className="form-floating mb-3">
          <input
            type="number"
            name="nit"
            className="form-control"
            placeholder="Nit"
            value={nit}
            onChange={onInputChange}
          />
          <label>Nit</label>
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
            onClick={createSubmit}
            //disabled={loading}
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};
