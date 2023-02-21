import { useEffect } from "react";
import { useAuthStore, useForm } from "../../../hooks";
import "./Login.css";

import validator from "validator";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";

const loginFormFields = {
  email: "",
  password: "",
};

export const Login = () => {
  const { startLogin, errorMessage } = useAuthStore();

  const { email, password, onInputChange } = useForm(loginFormFields);

  const navigate = useNavigate();

  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "Email no es valido",
      });
      return false;
    } else if (password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Contraseña no es validad debe tener 6 caracteres",
      });
      return false;
    }

    return true;
  };

  const loginSubmit = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      startLogin({ email: email, password: password });
    }
  };

  const handleGoToRegister = (event) => {
    event.preventDefault();
    navigate("/register", {});
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en la autenticación", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <div className="container mt-5 centered">
      <form onSubmit={loginSubmit}>
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
          <label>Password</label>
        </div>

        <div className="d-grid gap-2">
          <button
            className="btn btn-primary"
            onClick={loginSubmit}
            //disabled={loading}
          >
            Login
          </button>
        </div>

        <div className="d-grid gap-2 mt-2">
          <button className="btn btn-secondary" onClick={handleGoToRegister}>
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};
