import { useEffect } from "react";
import { useAuthStore, useForm } from "../../../hooks";
import "./Register.css";

import validator from "validator";
import Swal from "sweetalert2";

const registerFormFields = {
  name: "",
  email: "",
  password: "",
  ProfileId: 2,
};

export const Register = () => {
  const { startRegister, errorMessage, status } = useAuthStore();

  const { name, email, password, ProfileId, onInputChange } =
    useForm(registerFormFields);

  const isFormValid = () => {
    if (name.trim().length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "Nombre es obligatorio",
      });
      return false;
    } else if (!validator.isEmail(email)) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "Email no es valido",
      });
      return false;
    } else if (password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "Contraseña no es validad debe tener 6 caracteres",
      });
      return false;
    }
    return true;
  };

  const registerSubmit = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      startRegister({
        name: name,
        email: email,
        password: password,
        ProfileId: ProfileId,
      });
    }
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en la autenticación", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <div className="container mt-5 centered">
      <form onSubmit={registerSubmit}>
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
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={onInputChange}
          />
          <label>Email</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={onInputChange}
          />
          <label>Contraseña</label>
        </div>

        <div className="d-grid gap-2 mt-2">
          <button
            className="btn btn-secondary"
            onClick={registerSubmit}
            disabled={status === "checking"}
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};
