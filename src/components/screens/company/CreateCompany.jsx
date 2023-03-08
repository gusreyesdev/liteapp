import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

import { useCreateCompanyMutation, useGetUsersQuery } from "../../../store/api";
import { useForm } from "../../../hooks";
import "./Company.css";

const createFormFields = {
  nit: "",
  name: "",
  address: "",
  phone: "",
};

export const CreateCompany = () => {
  const { user } = useSelector((state) => state.auth);

  const { data: users } = useGetUsersQuery();

  const [selectUser, setSelectUser] = useState({});

  const userArray = [];

  if (users != undefined) {
    users.user.forEach((userData) => {
      if (userData.id != user.id) {
        userArray.push(userData);
      }
    });
  }

  const [createCompany] = useCreateCompanyMutation();

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

  const handleChangeUser = (e) => {
    setSelectUser({
      user: e.target.value,
    });
  };

  const createSubmit = async (event) => {
    event.preventDefault();

    if (isFormValid()) {
      try {
        const payload = await createCompany({
          nit: nit,
          name: name,
          address: address,
          phone: phone,
          UserId: parseInt(selectUser.user),
        }).unwrap();

        Swal.fire({
          icon: "success",
          title: "Exitoso",
          text: "La empresa ha sido añadida",
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
      <form onSubmit={createSubmit}>

        <div className="form-floating mb-3">
          <select
            className="form-select"
            defaultValue="0"
            onChange={handleChangeUser}
          >
            <option value="0" disabled>
              Seleccione Propietario Empresa
            </option>

            {userArray.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

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
