import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

import { useForm } from "../../../hooks";
import { useUpdateCompanyMutation } from "../../../store/api";
import "./Company.css";


const updateFormFields = {
  name: "",
  address: "",
  phone: "",
};

export const UpdateCompany = () => {
  const { state } = useLocation();

  const { user } = useSelector((state) => state.auth);

  const [updateCompany] = useUpdateCompanyMutation();

  const { name, address, phone, onInputChange } = useForm(updateFormFields);

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

  const updateSubmit = async (event) => {
    event.preventDefault();

    if (isFormValid()) {

      try {

        const payload = await updateCompany({
          nit: state.nit,
          name: name,
          address: address,
          phone: phone,
          UserId: user.id,
        }).unwrap();

        Swal.fire({
          icon: "success",
          title: "Exitoso",
          text: "La empresa ha sido actualizada",
        });

      } catch (error) {

        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.data.msg,
        });
      
      }
    }
  };


  return (
    <div className="container mt-5 centered">
      <form onSubmit={updateSubmit}>

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
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
};
